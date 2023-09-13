import { Module } from '@nestjs/common';
import { GestorAmbienteService } from './gestor-ambiente.service';
import { GestorAmbienteController } from './gestor-ambiente.controller';
import { AmbienteModule } from 'src/ambiente/ambiente.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GestorAmbiente,
  GestorAmbienteSchema,
} from './schema/gestor-ambiente.schema';

@Module({
  imports: [
    AmbienteModule,
    MongooseModule.forFeature([
      { name: GestorAmbiente.name, schema: GestorAmbienteSchema },
    ]),
  ],
  controllers: [GestorAmbienteController],
  providers: [GestorAmbienteService],
  exports: [GestorAmbienteService],
})
export class GestorAmbienteModule {}
