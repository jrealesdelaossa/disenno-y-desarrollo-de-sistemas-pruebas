import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GestorAmbiente } from './schema/gestor-ambiente.schema';
import { Model } from 'mongoose';
import { AmbienteService } from 'src/ambiente/ambiente.service';
import { eventosDto } from 'src/evento/dto/eventos.dto';
import { eliminarEventoEspecificoDto } from 'src/evento/dto/eliminarEvento.dto';
import { SedesService } from 'src/sedes/sedes.service';

@Injectable()
export class GestorAmbienteService {
  constructor(
    @InjectModel(GestorAmbiente.name)
    private gestorAmbienteModel: Model<GestorAmbiente>,
    @Inject(AmbienteService) private ambienteService: AmbienteService,
    @Inject(SedesService) private sedesService: SedesService,
  ) {}

  async crearGestorActual(centro: string) {
    const calendarioEstatico = Array(31).fill({
      morning: null,
      afternoon: null,
      night: null,
    });
    var insertAmbientes = [];
    let sedes: any = await this.sedesService.sedesPorCentro(centro);
    sedes = sedes.map((sede: any) => {
      return sede.id;
    });

    // El uso de promise all es por que los Maps asincronicos anidados se comportan de manera indetermindas
    await Promise.all(
      sedes.map(async (sede: any) => {
        let AmbienteSedeEspecifico = {
          centro: centro,
          sede: sede,
          ambientes: [],
        };
        const ambientesDeLaSede =
          await this.ambienteService.ambientesPorSede(sede);

        /*       ambientesDeLaSede.map((ambiente: any) => {
          let ambienteParaDisponibilidad = {
            id: ambiente.id,
            nombre: `${ambiente.bloque.nomenclatura}-${ambiente.codigo}`,
            calendario: calendarioEstatico,
          };
          AmbienteSedeEspecifico.ambientes.push(ambienteParaDisponibilidad);
        }); */

        // Usar Promise.all con map para hacer las operaciones asincrónicas
        await Promise.all(
          ambientesDeLaSede.map(async (ambiente: any) => {
            const ambienteParaDisponibilidad = {
              id: ambiente.id,
              nombre: `${ambiente.bloque.nomenclatura}-${ambiente.codigo}`,
              calendario: calendarioEstatico,
            };
            AmbienteSedeEspecifico.ambientes.push(ambienteParaDisponibilidad);
          }),
        );
        insertAmbientes.push(AmbienteSedeEspecifico);
      }),
    );
    return await this.gestorAmbienteModel.insertMany(insertAmbientes);
  }

  async actualizarAmbiente(evento: eventosDto[]) {
    evento.map(async (evento) => {
      const ambientesSedes: any = await this.gestorAmbienteModel.findOne({
        'ambientes.id': evento.ambiente.id,
      });

      let ambienteActualizado = ambientesSedes.ambientes.map(
        (ambientes: any) => {
          if (ambientes.id == evento.ambiente.id) {
            switch (evento.horario) {
              case '6-12':
                for (let i = 0; i < evento.diastrabajados.length; i++) {
                  ambientes.calendario[evento.diastrabajados[i] - 1].morning =
                    true;
                }
                break;
              case '12-18':
                for (let i = 0; i < evento.diastrabajados.length; i++) {
                  ambientes.calendario[evento.diastrabajados[i] - 1].afternoon =
                    true;
                }
                break;
              case '18-22':
                for (let i = 0; i < evento.diastrabajados.length; i++) {
                  ambientes.calendario[evento.diastrabajados[i] - 1].night =
                    true;
                }
                break;
            }
          }
          return ambientes;
        },
      );

      return await this.gestorAmbienteModel.findByIdAndUpdate(
        ambientesSedes.id,
        {
          $set: { ambientes: ambienteActualizado },
        },
      );
    });
  }

  async restarHorarioAmbiente(evento: eliminarEventoEspecificoDto) {
    let idGestor = null;
    const ambienteEspecifico = await this.gestorAmbienteModel
      .find()
      .then((ambientes: any) => {
        idGestor = ambientes[0].id;
        return ambientes[0].ambientes;
      });
    ambienteEspecifico.map((ambiente) => {
      if (ambiente.nombre == evento.evento.ambiente.ambiente) {
        switch (evento.evento.horario) {
          case '6-12':
            for (let i = 0; i < evento.evento.diastrabajados.length; i++) {
              ambiente.calendario[evento.evento.diastrabajados[i] - 1].morning =
                null;
            }
            break;
          case '12-18':
            for (let i = 0; i < evento.evento.diastrabajados.length; i++) {
              ambiente.calendario[
                evento.evento.diastrabajados[i] - 1
              ].afternoon = null;
            }
            break;
          case '6-12':
            for (let i = 0; i < evento.evento.diastrabajados.length; i++) {
              ambiente.calendario[evento.evento.diastrabajados[i] - 1].night =
                null;
            }
            break;

          default:
            break;
        }
      }
    });
    return await this.gestorAmbienteModel.findByIdAndUpdate(idGestor, {
      $set: { ambientes: ambienteEspecifico },
    });
  }
  async findAll() {
    try {
      return this.gestorAmbienteModel.find();
    } catch (error) {
      return new InternalServerErrorException(
        'Ocurrio un error, Revise los logs del sistema.',
      );
    }
  }

  async findByCentro(centro: string) {
    return await this.gestorAmbienteModel
      .find({ centro: centro })
      .populate('sede')
      .then((data) => {
        if (data) {
          return data;
        }
        return new NotFoundException(
          `No se encontraron ambientes para el centro : ${centro}`,
        );
      });
  }

  async findBySede(sede: string) {
    return await this.gestorAmbienteModel.find({ sede: sede }).then((data) => {
      if (data) {
        return data;
      }
      return new NotFoundException(
        `No se encontraron sedes con el id: ${sede}`,
      );
    });
  }
  async reiniciarDisponibilidadCentro(centro: string) {
    await this.gestorAmbienteModel.deleteMany({ centro: centro });
    return await this.crearGestorActual(centro);
  }
}
