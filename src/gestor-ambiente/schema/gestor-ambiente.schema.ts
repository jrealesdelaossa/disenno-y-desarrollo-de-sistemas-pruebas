import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateGestorAmbienteDto } from '../dto/gestor-ambiente.dto';

export type GestorAmbienteDocument = HydratedDocument<GestorAmbiente>;

@Schema()
export class GestorAmbiente {
  @Prop()
  ambientes: CreateGestorAmbienteDto;
}

export const GestorAmbienteSchema =
  SchemaFactory.createForClass(GestorAmbiente);
