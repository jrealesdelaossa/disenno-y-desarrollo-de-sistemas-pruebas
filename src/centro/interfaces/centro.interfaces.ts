import { Document } from 'mongoose';
export interface Centro extends Document {
  readonly codigo: string;
  readonly nombre: string;
  readonly regional: string;
  readonly municipio: string;
}
