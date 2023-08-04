import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { gestorTDto } from './dto/gestor-t.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gestor } from './schema/gestor-t.schema';
import { Model } from 'mongoose';

@Injectable()
export class GestorTService {
  constructor(@InjectModel(Gestor.name) private gestorTModel: Model<Gestor>) {}
  async crearGestor(gestorTDto: gestorTDto) {
    const existeGestor = await this.existeGestor(gestorTDto.ficha);
    if (!existeGestor) {
      return await this.gestorTModel.create(gestorTDto);
    }
    return new ConflictException(
      `El gestor de tiempo para la ficha: ${gestorTDto.ficha} ya existe`,
    );
  }

  async obtenerTodo() {
    return await this.gestorTModel.find();
  }

  async obtenerGestor(ficha: string) {
    return await this.gestorTModel.find({ ficha: ficha }).then((gestor) => {
      return gestor
        ? gestor
        : new NotFoundException(
            `No se encontró un gestor de tiempo para la ficha: ${ficha}`,
          );
    });
  }

  async existeGestor(ficha: string): Promise<boolean> {
    return await this.gestorTModel.find({ ficha: ficha }).then((gestor) => {
      return gestor == null ? false : gestor.length == 0 ? false : true;
    });
  }
}
