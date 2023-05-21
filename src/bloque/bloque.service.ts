import { Injectable, NotFoundException } from '@nestjs/common';
import { Bloque } from './schema/bloque.schema';
import { Bloque_Dto } from './dto/bloque.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BloqueService {
  constructor(@InjectModel(Bloque.name) private bloqueModel: Model<Bloque>) {}

  async findAllBlock() {
    return await this.bloqueModel.find().then((data) => {
      return data
        ? data
        : new NotFoundException('No se encontraron documentos en bloque');
    });
  }

  async findOneBlock(id: string) {
    return await this.bloqueModel.findById(id).then((data) => {
      return data
        ? data
        : new NotFoundException(`No se encontro el bloque con id:${id}`);
    });
  }

  async createBlock(bloque: Bloque_Dto) {
    return await this.bloqueModel.create(bloque);
  }

  async updateBlock(payload: Bloque_Dto) {
    return await this.bloqueModel
      .findByIdAndUpdate(payload._id, payload)
      .then((data) => {
        return data
          ? data
          : new NotFoundException(
              `No se encontro el bloque con id:${payload._id}`,
            );
      });
  }

  async deleteBlock(id: string) {
    return await this.bloqueModel.findByIdAndDelete(id).then((data) => {
      return data
        ? data
        : new NotFoundException(`No se encontro el bloque con id:${id}`);
    });
  }
}
