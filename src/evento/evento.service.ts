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
import { eliminarEventoDto } from './dto/eliminarEvento.dto';
import { GestorAmbienteService } from 'src/gestor-ambiente/gestor-ambiente.service';

@Injectable()
export class EventoService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<Evento>,
    @Inject(GestorTService) private gestorTService: GestorTService,
    @Inject(GestorAmbienteService)
    private gestorAmbienteService: GestorAmbienteService,
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
      const respuesta = [];

      // eventos retornados por la consulta
      eventosEncontrados.forEach((eventoEncontrado) => {
        // eventos de cada evento retornado
        eventoEncontrado.eventos.forEach((eventoEventoEncontrado, index) => {
          // Recorro los eventos nuevos
          evento.eventos.forEach((eventos) => {
            const dias = [];

            if (
              eventoEventoEncontrado.diastrabajados.some((dia) => {
                if (eventos.diastrabajados.includes(dia)) {
                  dias.push(dia);
                }
                return eventos.diastrabajados.includes(dia);
              })
            ) {
              const diasCadena = '';
              dias.forEach((dia) => {
                diasCadena.concat(dia) + ' ';
              });

              // eliminar evento no valido
              const arrEventos = [...eventoEncontrado.eventos];
              for (let i = 0; eventoEncontrado.eventos.length > i; i++) {
                if (i !== index) {
                  arrEventos.splice(i, 1);
                }
              }

              console.log(`Dias reportados : ${dias}`);

              respuesta.push({
                evento: arrEventos,
                mensaje: `Ya existe un evento en el ambiente ${eventos.ambiente.ambiente} con horario ${eventos.horario} para el día ${dias} del mes ${eventoEncontrado.mes} de ${eventoEncontrado.year}`,
              });
            }
          });
        });
      });

      throw new ConflictException(respuesta);
    }

    /**
     * Valida los tiempos que se piensan agregar al gestor de tiempo
     * y retorna un error en la respuesta en caso de encontrar
     * alguno.
     */
    await this.validarTiempos(evento);

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
    //LLamado a gestor ambiente para actualizar la disponibilidad de los ambientes
    await this.gestorAmbienteService.actualizarAmbiente(evento.eventos);

    const registroEventoExistente = await this.eventoModel.find({
      mes: evento.mes,
      year: evento.year,
      instructor: evento.instructor,
    });

    if (registroEventoExistente.length === 0) {
      const createdEvento = new this.eventoModel(evento);
      createdEvento.save();
      return {
        statusCode: HttpStatus.CREATED,
        message: createdEvento,
        messageGestor: respGestor,
      };
    } else {
      evento.eventos.forEach((evento) => {
        registroEventoExistente[0].eventos.push(evento);
      });
      const eventoActualizado = await this.eventoModel
        .findByIdAndUpdate(
          registroEventoExistente[0]._id,
          registroEventoExistente[0],
        )
        .exec();

      return {
        isUpdated: true,
        statusCode: HttpStatus.CREATED,
        message: eventoActualizado,
        messageGestor: respGestor,
      };
    }
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

  /**
   * Obtener los eventos de un instructor en especifico filtrando por
   * mes y año para mostrarlos en la vista de Eventos
   *
   * @param mes Mes de los eventos a consultar
   * @param year Año de los eventos a consultar
   * @param instructor ObjectId del instructor al que se le consultaran los eventos
   * @returns Eventos de un instructor por mes y año
   */
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

  /**
   * Valida los tiempos acumulados de los Resultados de aprendizaje,
   * las Competencias y la Ficha de los eventos que se están intentando
   * registrar haciendo uso del campo "horas" de los eventos enviados.
   *
   * @param payload Registro de evento que se quiere guardar en la base de datos
   * @returns true en caso de pasar las validaciones
   */
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
        /*
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para el resultado ${payload.eventos[index].resultado.resultado}`,
          error: 'Bad Request',
          evento: payload.eventos[index],
        };
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para el resultado ${payload.eventos[index].resultado.resultado}`,
        */
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para el resultado ${payload.eventos[index].resultado.resultado}`,
          error: 'Bad Request',
          evento: payload.eventos[index],
        });
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
        /*
        throw new BadRequestException(
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para la competencia ${payload.eventos[index].competencia.codigo}`,
        );
        */
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible para la competencia ${payload.eventos[index].competencia.codigo}`,
          error: 'Bad Request',
          evento: payload.eventos[index],
        });
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
        /*
        throw new BadRequestException(
          `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible`,
        );
        */
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `La ficha ${payload.eventos[index].ficha.codigo} no tiene tiempo disponible`,
          error: 'Bad Request',
          evento: payload.eventos[index],
        });
      }
    });

    //console.log(tiempoResultado);

    return true;
  }

  /**
   * Eliminar evento registrado en la base de datos
   *
   * @param eventoInfo Información del evento a eliminar
   * @returns Evento eliminado
   */
  async eliminarEvento(eventoInfo: eliminarEventoDto) {
    const evento = await this.eventoModel
      .find({
        mes: eventoInfo.mes,
        year: eventoInfo.year,
        'eventos.ambiente.ambiente': eventoInfo.ambiente,
        'eventos.horario': eventoInfo.horario,
        'eventos.diastrabajados': { $in: eventoInfo.diasTrabajados },
      })
      .exec();

    let fichaEvento = [];
    evento[0].eventos.forEach((event, index) => {
      if (
        event.diastrabajados.some((item) =>
          eventoInfo.diasTrabajados.includes(item),
        )
      ) {
        fichaEvento = evento[0].eventos.splice(index, 1);
      }
    });
    delete evento[0]._id;
    //Si se elimino un evento con splice
    if (fichaEvento.length == 1) {
      const gestorActualizar = {
        ficha: {
          ficha: fichaEvento[0].ficha.ficha,
        },
        horas: eventoInfo.horas,
        competencia: {
          codigo: fichaEvento[0].competencia.codigo,
        },
        resultado: {
          orden: fichaEvento[0].resultado.orden,
        },
      };
      //true si se resto bien sino false
      const tiempoFichaGestorActualizado =
        await this.gestorTService.restarTiempoFicha(gestorActualizar);

      return tiempoFichaGestorActualizado;
    }

    const eventoActualizado = await this.eventoModel
      .findByIdAndUpdate(evento[0]._id, evento[0])
      .exec();

    return eventoActualizado;
  }
}
