import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BloqueDocument = HydratedDocument<Bloque>;

@Schema()
export class Bloque {
  @Prop()
  nombre: string;

  @Prop()
  nomenclatura: string;
}

export const BloqueSchema = SchemaFactory.createForClass(Bloque);
