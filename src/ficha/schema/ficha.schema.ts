import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
// import { Jornada } from 'src/jornada/schema/jornada.schema';
import { Ambiente } from 'src/ambiente/schemas/ambiente.schema';
import { Programa } from 'src/programa/schema/programa.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { jornadaDto } from '../dto/jornadaDto';
import { Sede } from 'src/sedes/schema/sede.schema';

export type FichaDocument = HydratedDocument<Ficha>;

@Schema()
export class Ficha {
  @Prop()
  codigo: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sede' })
  sede: Sede;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ambiente' })
  ambiente: Ambiente;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Programa' })
  programa: Programa;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' })
  instructor: Instructor;

  @Prop()
  jornadas: jornadaDto[];
}
export const FichaSchema = SchemaFactory.createForClass(Ficha);
