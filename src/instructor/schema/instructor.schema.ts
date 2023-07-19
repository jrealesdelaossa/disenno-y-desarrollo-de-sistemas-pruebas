import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ContratoDto } from '../dto/contrato.dto';
import { Programa } from 'src/programa/schema/programa.schema';

export type InstructorDocument = HydratedDocument<Instructor>;

@Schema()
export class Instructor {
  @Prop({ required: true })
  documento: string;

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

  //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Programa' })
  @Prop({ required: true })
  programas: string[];
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
