import { Module } from '@nestjs/common';
import { CargueMasivoCompetenciasController } from './cargue-masivo-competencias.controller';
import { CargueMasivoCompetenciasService } from './cargue-masivo-competencias.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Competencia,
  CompetenciaSchema,
} from 'src/competencia/schema/competencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competencia.name, schema: CompetenciaSchema },
    ]),
  ],
  controllers: [CargueMasivoCompetenciasController],
  providers: [CargueMasivoCompetenciasService],
  exports: [CargueMasivoCompetenciasService],
})
export class CargueMasivoCompetenciasModule {}
