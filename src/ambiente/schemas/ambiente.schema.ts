import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Schema } from 'mongoose';
import { Sede } from '../../sedes/schema/sede.schema';

export type CentroDocument = HydratedDocument<Sede>;

@Schema()
export class Ambiente {
  @Prop({ require: true, unique: true })
  codigo: string;

  @Prop({ required: true })
  bloque: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sede' })
  sede: Sede;
}

export const AmbienteSchema = SchemaFactory.createForClass(Ambiente);
