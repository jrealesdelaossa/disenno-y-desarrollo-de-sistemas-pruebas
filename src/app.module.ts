import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SedesModule } from './sedes/sedes.module';
import { RegionalModule } from './regional/regional.module';
import { CentroModule } from './centro/centro.module';
import { AmbienteModule } from './ambiente/ambiente.module';
import { BloqueModule } from './bloque/bloque.module';
import { TipoAmbienteModule } from './tipo-ambiente/tipo-ambiente.module';
import { ProgramaModule } from './programa/programa.module';
import { NivelDeFormacionModule } from './nivel-de-formacion/nivel-de-formacion.module';
import { JornadaModule } from './jornada/jornada.module';
import { TipoDeVinculacionModule } from './tipo-de-vinculacion/tipo-de-vinculacion.module';
import { InstructorModule } from './instructor/instructor.module';
import { FichaModule } from './ficha/ficha.module';
import { EnvCofiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvCofiguration],
      validationSchema: JoiValidationSchema,
      
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    CentroModule,
    SedesModule,
    RegionalModule,
    AmbienteModule,
    BloqueModule,
    TipoAmbienteModule,
    ProgramaModule,
    NivelDeFormacionModule,
    JornadaModule,
    TipoDeVinculacionModule,
    InstructorModule,
    FichaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
