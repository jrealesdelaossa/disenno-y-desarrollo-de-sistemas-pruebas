import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {Regional_Dto} from './dto/regional.dto';
import { Regional } from './schema/regional.schema';
@Injectable()
export class RegionalService {
    constructor(@InjectModel(Regional.name) private regionalModel: Model<Regional>) {}

    async create_regional(regional_dto : Regional_Dto) : Promise<Regional>{
        const regional = new this.regionalModel(regional_dto);
        return await regional.save();
       }


}
