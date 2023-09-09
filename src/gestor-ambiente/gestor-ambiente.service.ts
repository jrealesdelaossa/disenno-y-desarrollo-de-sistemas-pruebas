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

@Injectable()
export class GestorAmbienteService {
  constructor(
    @InjectModel(GestorAmbiente.name)
    private gestorAmbienteModel: Model<GestorAmbiente>,
    @Inject(AmbienteService) private ambienteService: AmbienteService,
  ) {}
  async crearGestorActual() {
    const ambientes = await this.ambienteService.getAllAmbientes();
    const calendarioEstatico = Array(31).fill({
      morning: null,
      afternoon: null,
      night: null,
    });

    const gestorAmbiente = {
      ambientes: [],
    };
    ambientes.map((ambientesIterados: any) => {
      const objectAmbiente = {
        id: ambientesIterados.id,
        nombre: `${ambientesIterados.bloque.nomenclatura}-${ambientesIterados.codigo}`,
        calendario: calendarioEstatico,
      };
      gestorAmbiente.ambientes.push(objectAmbiente);
    });
    return await this.gestorAmbienteModel.create(gestorAmbiente);
  }

  async actualizarAmbiente(evento: eventosDto[]) {
    let idGestor = null;
    const ambientesCalendario = await this.gestorAmbienteModel
      .find()
      .then((resp: any) => {
        idGestor = resp[0].id;
        return resp[0].ambientes;
      });
    ambientesCalendario.map((ambiente) => {
      evento.map((evento) => {
        if (evento.ambiente.id == ambiente.id) {
          switch (evento.horario) {
            case '6-12':
              for (let i = 0; i < evento.diastrabajados.length; i++) {
                ambiente.calendario[evento.diastrabajados[i] - 1].morning =
                  true;
              }
              break;
            case '12-18':
              for (let i = 0; i < evento.diastrabajados.length; i++) {
                ambiente.calendario[evento.diastrabajados[i] - 1].afternoon =
                  true;
              }
              break;
            case '6-12':
              for (let i = 0; i < evento.diastrabajados.length; i++) {
                ambiente.calendario[evento.diastrabajados[i] - 1].night = true;
              }
              break;

            default:
              break;
          }
        }
        return evento;
      });
    });
    return await this.gestorAmbienteModel.findByIdAndUpdate(idGestor, {
      $set: { ambientes: ambientesCalendario },
    });
  }

  async findAll() {
    try {
      return this.gestorAmbienteModel.find().then((resp) => resp[0]);
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException(
        'Ocurrio un error, Revise los logs del sistema.',
      );
    }
  }

  /**
   * Elimina todos los registros de la coleccion gestorAmbiente
   * @returns
   */
  async eliminarTodos() {
    try {
      const docs = await this.gestorAmbienteModel.find();
      if (docs.length == 0) {
        throw new NotFoundException('No hay registros para eliminar');
      }

      docs.forEach(async (doc) => {
        console.log(doc.id);

        await this.gestorAmbienteModel.findByIdAndDelete(doc.id);
      });
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException(
        'Ocurrio un error, Revise los logs del sistema.',
      );
    }
  }
}
