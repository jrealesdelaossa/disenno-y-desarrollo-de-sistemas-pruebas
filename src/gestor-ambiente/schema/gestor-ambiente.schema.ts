import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Ambiente } from 'src/ambiente/schemas/ambiente.schema';
import { CalendarioDto } from '../dto/calendario.dto';
import { CreateGestorAmbienteDto } from '../dto/gestor-ambiente.dto';

export type GestorAmbienteDocument = HydratedDocument<GestorAmbiente>;

@Schema()
export class GestorAmbiente {
  @Prop()
  ambientes: CreateGestorAmbienteDto;
}

export const GestorAmbienteSchema =
  SchemaFactory.createForClass(GestorAmbiente);
