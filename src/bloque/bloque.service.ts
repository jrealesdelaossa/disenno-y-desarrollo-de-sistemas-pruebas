import { Injectable, NotFoundException } from '@nestjs/common';
import { Bloque } from './schema/bloque.schema';
import { Bloque_Dto } from './dto/bloque.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BloqueService {
  constructor(@InjectModel(Bloque.name) private bloqueModel: Model<Bloque>) {}

  async findAllBlock() {
    return 'This action returns all block';
  }

  async createBlock(bloque: Bloque_Dto) {
    return await this.bloqueModel.create(bloque);
  }
}
