import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { eventosDto } from '../dto/eventos.dto';

export type EventoDocument = HydratedDocument<Evento>;

@Schema()
export class Evento {
  @Prop({ required: true })
  mes: number;

  @Prop({ required: true })
  year: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' })
  instructor: Instructor;

  @Prop({ required: true })
  eventos: eventosDto[];
}
export const EventoSchema = SchemaFactory.createForClass(Evento);
