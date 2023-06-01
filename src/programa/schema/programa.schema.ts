import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TipoFormacion } from '../interfaces/tipo_programa.interfaces';

export type ProgramaDocument = HydratedDocument<Programa>;

@Schema()
export class Programa {
  @Prop({ required: true })
  nombre: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tipo-formacion',
  })
  centro: TipoFormacion;

  @Prop()
  lugar_funcionamiento: string;

  @Prop()
  departamento: string;

  @Prop()
  municipio: string;
}

export const SedeSchema = SchemaFactory.createForClass(Programa);
