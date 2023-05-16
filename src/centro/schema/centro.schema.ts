import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Regional } from '../../regional/schema/regional.schema';
export type CentroDocument = HydratedDocument<Centro>;
@Schema()
export class Centro {
  @Prop()
  codigo: string;
  @Prop()
  nombre: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Regional' })
  regional: Regional;
  @Prop()
  municipio: string;
}
export const CentroSchema = SchemaFactory.createForClass(Centro);
