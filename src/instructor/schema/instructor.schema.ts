import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ContratoDto } from '../dto/contrato.dto';
import { Jornada } from 'src/jornada/schema/jornada.schema';

export type InstructorDocument = HydratedDocument<Instructor>;

@Schema()
export class Instructor {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  celular: string;

  @Prop({ required: true })
  contrato: ContratoDto;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jornada' })
  jornada: Jornada;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
