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

@Injectable()
export class GestorAmbienteService {
  constructor(
    @InjectModel(GestorAmbiente.name)
    private gestorAmbienteModel: Model<GestorAmbiente>,
    @Inject(AmbienteService) private ambienteService: AmbienteService,
  ) {}
  async crearGestorActual() {
    const ambientes = await this.ambienteService.getAllAmbientes();
    let calendarioEstatico = Array(31).fill({
      morning: null,
      afternoon: null,
      night: null,
    });

    let gestorAmbiente = {
      ambientes: [],
    };
    ambientes.map((ambientesIterados: any) => {
      let objectAmbiente = {
        id: ambientesIterados.id,
        nombre: `${ambientesIterados.bloque.nomenclatura}-${ambientesIterados.codigo}`,
        calendario: calendarioEstatico,
      };
      gestorAmbiente.ambientes.push(objectAmbiente);
    });
    return await this.gestorAmbienteModel.create(gestorAmbiente);
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

  findOne(id: number) {
    return `This action returns a #${id} gestorAmbiente`;
  }

  remove(id: number) {
    return `This action removes a #${id} gestorAmbiente`;
  }
}
