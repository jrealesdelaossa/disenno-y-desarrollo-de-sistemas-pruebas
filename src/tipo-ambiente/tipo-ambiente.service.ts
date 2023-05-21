import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITipoAmbiente } from './interfaces/tipo-ambiente.interface';
import { TipoAmbiente } from './schemas/tipo-ambiente.schema';
import { CreatedTipoAmbienteDTO, UpdateTipoAmbienteDTO } from './dto/tipo-ambiente.dto';

@Injectable()
export class TipoAmbienteService {
    constructor(@InjectModel('tipo-ambiente') private readonly tipoAmbienteModel: Model<TipoAmbiente>) { }

    async getAllTipos(): Promise<TipoAmbiente[]> {
        return await this.tipoAmbienteModel.find().then(
            (dato) => {
                if (!dato) throw new HttpException('no se encontraron registros', HttpStatus.NOT_FOUND);
                else return dato;
            }
        );
    }

    async getByIdTipos(idTipo: string): Promise<TipoAmbiente> {
        const found = await this.tipoAmbienteModel.findById(idTipo).then(
            (dato) => {
                if (!dato) throw new HttpException('el registro no existe!!', HttpStatus.NOT_FOUND);
                else return dato;
            }
        );
        return found;
    }

    async createdTipoAmb(tipoAmbiente: CreatedTipoAmbienteDTO): Promise<TipoAmbiente> {
        let found = await this.tipoAmbienteModel.findOne({ codigo: tipoAmbiente.codigo });
        if (found)
            throw new HttpException(`el registro ya existe`, HttpStatus.CONFLICT)

        const newTipo = new this.tipoAmbienteModel(tipoAmbiente);
        return await newTipo.save();
    }

    async updateTipoAmb(idTipoAmb: string, updateTipoAmb: UpdateTipoAmbienteDTO): Promise<TipoAmbiente> {
        let found = await this.getByIdTipos(idTipoAmb);
        if (found) {
            const updateTipo = await this.tipoAmbienteModel.findByIdAndUpdate(updateTipoAmb);
            return updateTipo;
        }
    }

    async deleteTipoAmb(idTipoAmb: string) {
        let found = await this.getByIdTipos(idTipoAmb);
        if (found) {
            return await this.tipoAmbienteModel.findByIdAndDelete(idTipoAmb);
        }

    }
}
