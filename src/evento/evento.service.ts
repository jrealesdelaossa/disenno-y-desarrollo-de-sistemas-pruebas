import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento } from './schema/evento.schema';
import { eventoDto } from './dto/evento.dto';
import { GestorTService } from 'src/gestor-t/gestor-t.service';

@Injectable()
export class EventoService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<Evento>,
    @Inject(GestorTService) private gestorTService: GestorTService,
  ) {}

  async obtenerEventos(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async crearEvento(evento: eventoDto) {
    // * Obtenemos las condiciones de consulta para los eventos existentes
    const mesConsulta = evento.mes;
    const yearConsulta = evento.year;

    const condicionesConsulta = evento.eventos.map((evento) => {
      const dias = evento.diastrabajados.map((dia) => {
        return Number(dia);
      });

      return {
        mes: mesConsulta,
        year: yearConsulta,
        'eventos.ambiente.ambiente': evento.ambiente.ambiente,
        'eventos.horario': evento.horario,
        'eventos.diastrabajados': { $in: dias },
      };
    });

    // * Consulta de eventos existentes
    const eventosEncontrados = await this.eventoModel
      .find({
        $or: condicionesConsulta,
      })
      .exec();

    if (eventosEncontrados.length > 0) {
      console.log('@@@@');

      const respuesta = [];

      // eventos retornados por la consulta
      eventosEncontrados.forEach((eventoEncontrado) => {
        // eventos de cada evento retornado
        eventoEncontrado.eventos.forEach((eventoEventoEncontrado, index) => {
          // Recorro los eventos nuevos
          evento.eventos.forEach((eventos) => {
            if (
              eventoEventoEncontrado.diastrabajados.some((dia) =>
                eventos.diastrabajados.includes(dia),
              )
            ) {
              // eliminar evento no valido
              const arrEventos = [...eventoEncontrado.eventos];
              for (let i = 0; eventoEncontrado.eventos.length > i; i++) {
                if (i !== index) {
                  arrEventos.splice(i, 1);
                }
              }
              respuesta.push({
                evento: arrEventos,
                mensaje: `Ya existe un evento en el ambiente ${eventos.ambiente.ambiente} con horario ${eventos.horario} para el mes ${eventoEncontrado.mes} del año ${eventoEncontrado.year}`,
              });
            }
            // recorrer los día nuevos
            /*
            eventos.diastrabajados.forEach((dia) => {
              if (eventoEventoEncontrado.diastrabajados.includes(dia)) {
                respuesta.push({
                  evento: eventoEncontrado,
                  mensaje: `Ya existe un evento en el ambiente ${eventos.ambiente.ambiente} con horario ${eventos.horario} para el día ${dia} del mes ${event.mes} del año ${event.year}`,
                });
              }
            });
            */
          });
        });
      });

      /*
      const respuesta = eventosEncontrados.map((evento) => {
        return {
          evento,
          mensaje: `Ya existe un evento en el ambiente ${evento.eventos[0].ambiente.ambiente} con horario ${evento.eventos[0].horario} para el mes ${evento.mes} del año ${evento.year}`,
        };
      });

      */
      throw new ConflictException(respuesta);
    }

    await this.validarTiempos(evento);

    const createdEvento = new this.eventoModel(evento);
    createdEvento.save();

    //Se crea el objeto para enviarlo al gestor de tiempo para actualizar los tiempos de la ficha
    const gestorFicha = {
      eventos: evento.eventos.map((evento) => {
        return {
          ficha: {
            ficha: evento.ficha.ficha,
          },
          horas: evento.horas,
          competencia: {
            codigo: evento.competencia.codigo,
          },
          resultado: {
            orden: evento.resultado.orden,
          },
        };
      }),
    };

    //Llamado a gestor de tiempo para actualizar los tiempos de la ficha
    const respGestor = await this.gestorTService.reporteTiempos(gestorFicha);
    return {
      statusCode: HttpStatus.CREATED,
      message: createdEvento,
      messageGestor: respGestor,
    };
  }

  async obtenerEventosPorFecha(
    mes: number,
    year: number,
    ambiente: string,
    horario: string,
  ): Promise<boolean> {
    const evento = await this.eventoModel
      .find({
        mes: mes,
        year: year,
        'eventos.ambiente.ambiente': ambiente,
        'eventos.horario': horario,
      })
      .exec();

    return evento.length > 0 ? true : false;
  }

  async obtenerEventosEspecificos(
    mes: number,
    year: number,
    instructor: string,
  ) {
    const eventos = await this.eventoModel.find({
      mes: mes,
      year: year,
      instructor: instructor,
    });

    if (eventos.length === 0) {
      throw new BadRequestException(
        `No se encontraron eventos para el instructor ${instructor} en el mes ${mes} del año ${year}`,
      );
    }
    return eventos;
  }

  async validarTiempos(payload: eventoDto) {
    const idFichas = payload.eventos.map((evento) => {
      return {
        ficha: evento.ficha.ficha,
      };
    });

    const gestores = await this.gestorTService.obtenerGestoresPorFicha(
      idFichas,
    );

    // validación de tiempo para los resultados
    const tiempoResultado = idFichas.map((ficha, index) => {
      const validaciones = gestores.map((gestor) => {
        const idFichaEnvio = ficha.ficha;
        const idFichaGestor = JSON.stringify(gestor.ficha).replace(
          /['"]+/g,
          '',
        );

        if (idFichaEnvio === idFichaGestor) {
          // payload.eventos[index].horas == gestor.tiempo;
          const indiceCompetencia = gestor.competencias.findIndex(
            (competencia) =>
              competencia.codigo === payload.eventos[index].competencia.codigo,
          );

          const indiceResultado = gestor.competencias[
            indiceCompetencia
          ].resultados.findIndex(
            (resultado) =>
              resultado.descripcion ===
              payload.eventos[index].resultado.resultado,
          );

          const duracion =
            gestor.competencias[indiceCompetencia].resultados[indiceResultado]
              .duracion;

          const acumulado =
            gestor.competencias[indiceCompetencia].resultados[indiceResultado]
              .acumulado;

          const validacionResultado =
            acumulado + payload.eventos[index].horas <= duracion;

          if (!validacionResultado) {
            return false;
          } else {
            return true;
          }
        }
      });

      return validaciones.toString() === 'false' ? false : true;
    });

    tiempoResultado.forEach((resultado, index) => {
      if (!resultado) {
        throw new BadRequestException(
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para el resultado ${payload.eventos[index].resultado.resultado}`,
        );
      }
    });

    // validación de tiempo para las competencias
    const tiempoCompetencia = idFichas.map((ficha, index) => {
      // se suman las horas de envio para la misma ficha
      const sumaHorasEnvio = payload.eventos.reduce((acumulador, evento) => {
        if (evento.ficha.ficha === ficha.ficha) {
          return acumulador + evento.horas;
        }
      }, 0);

      const validaciones = gestores.map((gestor) => {
        const idFichaEnvio = ficha.ficha;
        const idFichaGestor = JSON.stringify(gestor.ficha).replace(
          /['"]+/g,
          '',
        );

        if (idFichaEnvio === idFichaGestor) {
          // payload.eventos[index].horas == gestor.tiempo;
          const indiceCompetencia = gestor.competencias.findIndex(
            (competencia) =>
              competencia.codigo === payload.eventos[index].competencia.codigo,
          );

          const duracion = gestor.competencias[indiceCompetencia].duracion;
          const acumulado = gestor.competencias[indiceCompetencia].acumulado;
          const validacionCompetencia = acumulado + sumaHorasEnvio <= duracion;

          return !validacionCompetencia ? false : true;
        }
      });
      return validaciones;
    });

    tiempoCompetencia.forEach((competencia, index) => {
      console.log(`Competencia ${index} - ${competencia}`);
      if (!competencia) {
        throw new BadRequestException(
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para la competencia ${payload.eventos[index].competencia.codigo}`,
        );
      }
    });
    // validación de tiempo para las fichas
    const tiempoFicha = idFichas.map((ficha) => {
      // se suman las horas de envio para la misma ficha
      const sumaHorasEnvio = payload.eventos.reduce((acumulador, evento) => {
        if (evento.ficha.ficha === ficha.ficha) {
          return acumulador + evento.horas;
        }
      }, 0);

      const validaciones = gestores.map((gestor) => {
        const idFichaEnvio = ficha.ficha;
        const idFichaGestor = JSON.stringify(gestor.ficha).replace(
          /['"]+/g,
          '',
        );

        if (idFichaEnvio === idFichaGestor) {
          // payload.eventos[index].horas == gestor.tiempo;

          const duracion = gestor.duracion;
          const acumulado = gestor.acumulado;
          const validacionFicha = acumulado + sumaHorasEnvio <= duracion;

          return !validacionFicha ? false : true;
        }
      });
      return validaciones;
    });

    tiempoFicha.forEach((ficha, index) => {
      console.log(`Ficha ${index} - ${ficha}`);
      if (!ficha) {
        throw new BadRequestException(
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible`,
        );
      }
    });

    //console.log(tiempoResultado);

    return true;
  }
}
