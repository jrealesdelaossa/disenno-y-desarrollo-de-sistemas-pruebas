import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SedeDocument = HydratedDocument<Sede>;

@Schema()
export class Sede {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const SedeSchema = SchemaFactory.createForClass(Sede);