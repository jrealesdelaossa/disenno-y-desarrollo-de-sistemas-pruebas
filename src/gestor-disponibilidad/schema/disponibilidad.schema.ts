import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { disponibilidadDto } from '../dto/disponibilidad.dto';

export type DisponibilidadDocument = HydratedDocument<Disponibilidad>;

@Schema()
export class Disponibilidad {
  @Prop({ required: true })
  ambientes: disponibilidadDto[];
}

export const DisponibilidadSchema =
  SchemaFactory.createForClass(Disponibilidad);
