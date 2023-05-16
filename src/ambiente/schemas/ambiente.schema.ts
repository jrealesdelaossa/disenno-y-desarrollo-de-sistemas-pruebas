import { Schema } from 'mongoose';
import { Sede } from '../../sedes/schema/sede.schema';


export const AmbienteSchema = new Schema({

    codigo: {
       type: String,
       require: true,
       unique: true
    },
    bloque: {
        type: String,
        require: true
    },
    tipo:  {
        type: String,
        require: true
    },
    sede: {
        type: Schema.Types.ObjectId,
        ref: Sede,
        default: []
    }

});