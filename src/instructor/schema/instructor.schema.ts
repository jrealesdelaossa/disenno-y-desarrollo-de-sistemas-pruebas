import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContratoDto } from '../dto/contrato.dto';

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
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
