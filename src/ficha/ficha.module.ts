import { Module } from '@nestjs/common';
import { FichaController } from './ficha.controller';
import { FichaService } from './ficha.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ficha, FichaSchema } from './schema/ficha.schema';
import { CompetenciaModule } from 'src/competencia/competencia.module';
import { ProgramaModule } from 'src/programa/programa.module';

@Module({
  imports: [
    CompetenciaModule,
    ProgramaModule,
    MongooseModule.forFeature([{ name: Ficha.name, schema: FichaSchema }]),
  ],
  controllers: [FichaController],
  providers: [FichaService],
})
export class FichaModule {}
