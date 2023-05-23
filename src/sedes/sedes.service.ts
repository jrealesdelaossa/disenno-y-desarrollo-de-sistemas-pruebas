import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sede } from './schema/sede.schema';
import { Model } from 'mongoose';
<<<<<<< HEAD
import { ActualizarSedeDto, SedeDto } from './dto/sedes.dto';
=======
import { CreateSedeDto, SedeDto } from './dto/sedes.dto';
>>>>>>> edc45b77f2d9258a08117ff3ba65c5d40466715a

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

  async crear_sede(sedeDto: SedeDto): Promise<NotFoundException | Sede> {
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

  async updateSede(sede: ActualizarSedeDto) {
    return await this.SedesModel.findByIdAndUpdate(sede.id, sede).then(
      (data) => {
        return data
          ? data
          : new NotFoundException(`No se encontro el sede con id:${sede.id}`);
      },
    );
  }
}
