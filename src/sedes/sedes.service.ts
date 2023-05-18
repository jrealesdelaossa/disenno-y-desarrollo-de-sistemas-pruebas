import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sede } from './schema/sede.schema';
import { Model } from 'mongoose';
import { CreateSede_Dto, Sede_Dto } from './dto/sedes.dto';
import { CreateBloque_Dto } from 'src/bloque/dto/bloque.dto';

@Injectable()
export class SedesService {
  constructor(@InjectModel(Sede.name) private SedesModel: Model<Sede>) {}


  async findAll(): Promise<NotFoundException | Sede[]> {
    return await this.SedesModel.find()
      .populate('centro')
      .then((data) => {
        if (data) {
          return data;
        } else {
          return new NotFoundException('No se encontraron documentos en sedes');
        }
      });
  }




  async crear_sede(sedeDto: Sede_Dto): Promise<NotFoundException | Sede> {
    const sedes = new this.SedesModel(sedeDto);
    return await sedes.save();
  }


  async borrar_sede(id: string) {
    return await this.SedesModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          `No se encontro el documento con id:${id} en sede`,
        );
      }
    });
  }

  async updateSede(sede: CreateSede_Dto) {
    return await this.SedesModel
      .findByIdAndUpdate(sede.id,sede)
      .then((data) => {
        return data
          ? data
          : new NotFoundException(
              `No se encontro el sede con id:${sede.id}`,
            );
      });
  }



}
