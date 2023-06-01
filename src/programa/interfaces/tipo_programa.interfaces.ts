import { Document } from 'mongoose';

export interface TipoFormacion extends Document {
  tipo_formacion: String;
}
