import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SedeDocument = HydratedDocument<Sede>;

@Schema()
export class Sede {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Centro' })
  centro: string; // Se necesita que este valor sea dete tipo centro

  @Prop()
  place_operation: string;

  @Prop()
  departament: string;

  @Prop()
  municipality: string;

}

export const SedeSchema = SchemaFactory.createForClass(Sede);
