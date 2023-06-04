import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Programa } from './schema/programa.schema';
import { Model, isValidObjectId } from 'mongoose';
import { ActualizarProgramaDto, ProgramaDto } from './dto/programa.dto';
import { competenciaDto } from './dto/competencia.dto';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectModel(Programa.name) private ProgramaModel: Model<Programa>,
  ) {}

  async obtenerTodo(): Promise<NotFoundException | Programa[]> {
    return await this.ProgramaModel.find().then((data) => {
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

  async crearCompetencia(
    competencia: competenciaDto,
    id: String,
  ): Promise<Programa | NotFoundException> {
    let existe = await this.verificarCompetenciaExistente(competencia);
    console.log(existe);
    return await this.ProgramaModel.findById(id).then((miprograma) => {
      if (miprograma) {
        if (existe) {
          return new NotFoundException('La Competencia ya existe');
        }
        miprograma.competencia.push(competencia);
        return this.ProgramaModel.findByIdAndUpdate(id, miprograma);
      }
      return new NotFoundException(
        'No se encontro el programa asociado a la competencia',
      );
    });
  }

  async remplezarCompetencia(id, competenciap) {
    return await this.ProgramaModel.findByIdAndUpdate(
      { _id: id, 'competencia.codigo': competenciap.codigo },
      {
        $set: { competencia: competenciap },
      },
    );
  }
  async verificarCompetenciaExistente(competenciap): Promise<boolean> {
    let existe: any = await this.ProgramaModel.exists({
      'competencia.codigo': competenciap.codigo,
    });
    existe === null ? (existe = false) : (existe = true);
    return existe;
  }
  async borrarCompetencia(id, codigo) {
    let programa = await this.ProgramaModel.findById(id).then((miprograma) => {
      console.log(miprograma);
    });
  }
}
