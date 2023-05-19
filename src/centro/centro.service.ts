import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Centro } from './schema/centro.schema';
import { Centro_Dto } from './dto/centro.dto';

@Injectable()
export class CentroService {
  constructor(@InjectModel(Centro.name) private centroModel: Model<Centro>) {}
  
  async findAll(): Promise<NotFoundException | Centro[]> {
    return await this.centroModel
      .find()
      .populate('regional')
      .then((data) => {
        if (data) {
          return data;
        } else {
          return new NotFoundException(
            'No se encontraron documentos en centros',
          );
        }
      });
  }
  async create_centro(
    centro_dto: Centro_Dto,
  ): Promise<NotFoundException | Centro> {
    /*const exitsRegional = await this.regionalService.checkById(
      centro_dto._regional,
    );
    if (exitsRegional) {*/
    const centro = new this.centroModel(centro_dto);
    return await centro.save();
    /*} else {
      return new NotFoundException('La regional no existe');
    }*/
  }
  async delete_centro(id: string) {
    return await this.centroModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          `No se encontro el documento con id:${id} en centro`,
        );
      }
    });
  }
  async update_centro(
    centro_dto: Centro_Dto,
  ): Promise<NotFoundException | Centro> {
    return await this.centroModel
      .findByIdAndUpdate(centro_dto._id, centro_dto)
      .then((data) =>
        data
          ? data
          : new NotFoundException(
              `No se pudo actualizar el centro con id: ${centro_dto._id}`,
            ),
      );
  }
}
