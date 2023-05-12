import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Regional_Dto } from './dto/regional.dto';
import { Regional } from './schema/regional.schema';
@Injectable()
export class RegionalService {
  constructor(
    @InjectModel(Regional.name) private regionalModel: Model<Regional>,
  ) {}

  async create_regional(regional_dto: Regional_Dto): Promise<Regional> {
    const regional = new this.regionalModel(regional_dto);
    return await regional.save();
  }

  async delete_regional(id: string) {
    return await this.regionalModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return 'No se encontro la regional';
      }
    });
  }

  async update_regional(id: string, regional_dto: Regional_Dto) {
    return await this.regionalModel
      .findByIdAndUpdate(id, regional_dto)
      .then((data) => {
        if (data) {
          return data;
        } else {
          return 'No se encontro la regional';
        }
      });
  }

  async update_regional_body(regional_dto: Regional_Dto) {
    return await this.regionalModel
      .findByIdAndUpdate(regional_dto._id, regional_dto)
      .then((data) => {
        if (data) {
          return data;
        } else {
          return 'No se encontro la regional';
        }
      });
  }
}
