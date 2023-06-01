import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Programa } from './schema/programa.schema';
import { Model } from 'mongoose';
import { ActualizarProgramaDto, ProgramaDto } from './dto/programa.dto';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectModel(Programa.name) private ProgramaModel: Model<Programa>,
  ) {}

  async obtenerTodo(): Promise<NotFoundException | Programa[]> {
    return await this.ProgramaModel.find()
      .populate('tipo-formacion')
      .then((data) => {
        if (data) {
          return data;
        } else {
          return new NotFoundException(
            'No se encontraron documentos en programas',
          );
        }
      });
  }

  async crearPrograma(
    ProgramaDto: ProgramaDto,
  ): Promise<NotFoundException | Programa> {
    const Programa = new this.ProgramaModel(ProgramaDto);
    return await Programa.save();
  }

  async borrarPrograma(id: string) {
    return await this.ProgramaModel.findByIdAndRemove(id).then((data) => {
      if (data) {
        return data;
      } else {
        return new NotFoundException(
          `No se encontro el documento con id:${id} en programas`,
        );
      }
    });
  }

  async actualizarPrograma(programa: ActualizarProgramaDto) {
    return await this.ProgramaModel.findByIdAndUpdate(
      programa.id,
      programa,
    ).then((data) => {
      return data
        ? data
        : new NotFoundException(
            `No se encontro el programa con id:${programa.id}`,
          );
    });
  }
}
