import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Competencia } from './schema/competencia.schema';
import { competenciaDto } from './dto/competencia.dto';

@Injectable()
export class CompetenciaService {
  constructor(
    @InjectModel(Competencia.name) private instructorModel: Model<Competencia>,
  ) {}

  // obtener todas las competencias
  async obtenerCompetencias(): Promise<Competencia[]> {
    return await this.instructorModel.find().exec();
  }

  // competencias por programa
  async obtenerCompetenciasPorPrograma(
    programa: string,
  ): Promise<Competencia[]> {
    return await this.instructorModel.find({ programa: programa }).exec();
  }

  // crear competencia
  async crearCompetencia(competencia: competenciaDto): Promise<Competencia> {
    const newCompetencia = new this.instructorModel(competencia);
    return await newCompetencia.save();
  }
}
