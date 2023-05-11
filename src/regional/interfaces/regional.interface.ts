import { Document } from 'mongoose';
export interface Regional extends Document {
  readonly codigo: string;
  readonly nombre: string;
  readonly municipio: string;
  readonly departamento: string;
}
