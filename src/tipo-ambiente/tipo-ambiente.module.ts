import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoAmbienteSchema } from './schemas/tipo-ambiente.schema';
import { TipoAmbienteController } from './tipo-ambiente.controller';
import { TipoAmbienteService } from './tipo-ambiente.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tipo-ambiente', schema: TipoAmbienteSchema },
    ]),
  ],
  controllers: [TipoAmbienteController],
  providers: [TipoAmbienteService],
})
export class TipoAmbienteModule {}
