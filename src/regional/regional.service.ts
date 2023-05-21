import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Regional_Dto } from './dto/regional.dto';
import { Regional } from './schema/regional.schema';
@Injectable()
export class RegionalService {
  constructor(
    @InjectModel(Regional.name) private regionalModel: Model<Regional>,
  ) {}

  // obtener todas las regionales
  async findAll(): Promise<NotFoundException | Regional[]> {
    return await this.regionalModel.find().then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          'No se encontraron documentos en regionales',
        );
      }
    });
  }
  async checkById(id: string): Promise<boolean | string> {
    return await this.regionalModel.findById(id).then((data) => {
      return data ? true : false;
    });
  }

  async create_regional(regional_dto: Regional_Dto): Promise<Regional> {
    // const regional = new this.regionalModel(regional_dto);
    // return await regional.save();
    const regional = this.regionalModel.create(regional_dto);
    return regional;
  }

  // eliminar una regional
  async delete_regional(id: string) {
    return await this.regionalModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          `No se encontro el documento con id:${id} en regionales`,
        );
      }
    });
  }
  // actualizar una regional
  // async update_regional(id: string, regional_dto: Regional_Dto) {
  //   return await this.regionalModel
  //     .findByIdAndUpdate(id, regional_dto)
  //     .then((data) => {
  //       if (data) {
  //         return data;
  //       } else {
  //         return 'No se encontro la regional';
  //       }
  //     });
  // }

  // actualizar una regional
  async update_regional(regional_dto: Regional_Dto) {
    return await this.regionalModel
      .findByIdAndUpdate(regional_dto._id, regional_dto)
      .then((data) => {
        if (data) {
          return `Se actualizo la regional con id: ${regional_dto._id}`;
        } else {
          return `No se encontro la regional con id: ${regional_dto._id}`;
        }
      });
  }
}
