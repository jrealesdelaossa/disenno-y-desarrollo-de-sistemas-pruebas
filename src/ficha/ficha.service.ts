import { Injectable } from '@nestjs/common';
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

  crearFicha(fichaDto: FichaDto) {
    const ficha = new this.fichaModel(fichaDto);
    return ficha.save();
  }
}
