import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Jornada } from 'src/jornada/schema/jornada.schema';
import { Ambiente } from 'src/ambiente/schemas/ambiente.schema';
import { Programa } from 'src/programa/schema/programa.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';

export type FichaDocument = HydratedDocument<Ficha>;

@Schema()
export class Ficha {
  @Prop()
  codigo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jornada' })
  jornada: Jornada;

  @Prop()
  fechaCreacion: Date;

  @Prop()
  fechaFinalizacion: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ambiente' })
  ambiente: Ambiente;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Programa' })
  programa: Programa;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' })
  instructor: Instructor;
}
export const FichaSchema = SchemaFactory.createForClass(Ficha);
