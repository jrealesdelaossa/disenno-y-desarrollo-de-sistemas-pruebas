import { Module } from '@nestjs/common';
import { GestorDisponibilidadController } from './gestor-disponibilidad.controller';
import { GestorDisponibilidadService } from './gestor-disponibilidad.service';
import {AmbienteService} from '../ambiente/ambiente.service'
import { Disponibilidad, DisponibilidadSchema } from './schema/disponibilidad.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Ambiente, AmbienteSchema } from 'src/ambiente/schemas/ambiente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Disponibilidad.name, schema: DisponibilidadSchema },
      { name: Ambiente.name, schema: AmbienteSchema },
    ]),
    
  ],
  controllers: [GestorDisponibilidadController],
  providers: [GestorDisponibilidadService,AmbienteService]
})
export class GestorDisponibilidadModule {}
