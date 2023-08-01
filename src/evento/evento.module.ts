import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evento, EventoSchema } from './schema/evento.schema';
import { InstructorModule } from 'src/instructor/instructor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evento.name, schema: EventoSchema }]),
    InstructorModule,
  ],

  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
