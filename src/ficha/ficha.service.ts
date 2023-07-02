import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ficha } from './schema/ficha.schema';
import { ActualizarFichaDto, FichaDto } from './dto/ficha.dto';

@Injectable()
export class FichaService {
  constructor(@InjectModel(Ficha.name) private fichaModel: Model<Ficha>) {}

  async obtenerTodo() {
    return await this.fichaModel
      .find()
      .populate('ambiente')
      .populate('programa')
      .populate('instructor')
      .populate('jornada');
  }

  async obtenerFicha(id: string) {
    return await this.fichaModel
      .findById(id)
      .populate('ambiente')
      .populate('programa')
      .populate('instructor')
      .populate('jornada')
      .then((ficha) => {
        return ficha
          ? ficha
          : new NotFoundException(`No se encontro la ficha con id:${id}`);
      });
  }

  async crearFicha(fichaDto: FichaDto) {
    const ficha = new this.fichaModel(fichaDto);
    //return await ficha.save();
    const response = await ficha.save();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ficha creada exitosamente',
      data: response,
    };
  }

  async actualizarFicha(
    ficha: ActualizarFichaDto,
  ): Promise<NotFoundException | Ficha> {
    console.log(ficha.id);
    return await this.fichaModel
      .findByIdAndUpdate(ficha.id, ficha)
      .then((ficha) => {
        return ficha
          ? ficha
          : new NotFoundException(
              `No se pudo actualizar la ficha con id:${ficha.id}`,
            );
      });
  }

  async eliminarFicha(id: string) {
    return await this.fichaModel.findByIdAndDelete(id).then((ficha) => {
      return ficha
        ? ficha
        : new NotFoundException(`No se encontró la ficha con id:${id}`);
    });
  }
}
