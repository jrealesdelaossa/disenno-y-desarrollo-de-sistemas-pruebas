import { Module } from '@nestjs/common';
import { AmbienteController } from './ambiente.controller';
import { AmbienteService } from './ambiente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ambiente, AmbienteSchema } from './schemas/ambiente.schema';
import { SedesModule } from 'src/sedes/sedes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ambiente.name, schema: AmbienteSchema },
    ]),
    SedesModule,
  ],
  controllers: [AmbienteController],
  providers: [AmbienteService],
})
export class AmbienteModule {}
