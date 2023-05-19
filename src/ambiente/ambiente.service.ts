import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAmbiente } from './interfaces/ambiente.interface';
import { CreatedAmbienteDTO, UpdateAmbienteDTO } from './dto/ambiente.dto';

@Injectable()
export class AmbienteService {
  constructor(
    @InjectModel('Ambiente') private readonly ambienteModel: Model<IAmbiente>,
  ) {}

  async getAllAmbientes(): Promise<IAmbiente[]> {
    return await this.ambienteModel.find();
  }

  async getByIdAmbiente(idAmbiente: string): Promise<IAmbiente> {
    const found = await this.ambienteModel.findById(idAmbiente).then((dato) => {
      if (!dato)
        throw new HttpException('El Ambiente no existe', HttpStatus.NOT_FOUND);
      else return dato;
    });
    return found;
  }
  async createdAmbiente(
    ambienteCreatedDto: CreatedAmbienteDTO,
  ): Promise<IAmbiente> {
    const found = await this.ambienteModel.findOne({
      codigo: ambienteCreatedDto.codigo,
    });
    if (found)
      throw new HttpException('El ambiente ya existe', HttpStatus.CONFLICT);
    const newAmbiente = this.ambienteModel.create(ambienteCreatedDto);
    return newAmbiente;
  }

  async updateAmbiente( //idAmbiente: string,
    updateAmbiente: UpdateAmbienteDTO,
  ): Promise<IAmbiente> {
    const found = await this.getByIdAmbiente(updateAmbiente._id);
    console.log(updateAmbiente._id);
    const updAmbiente = found.updateOne(updateAmbiente);
    return updAmbiente;
  }

  async deleteAmbiente(idAmbiente: string) {
    const found = await this.getByIdAmbiente(idAmbiente);
    const delAmbiente = found.deleteOne();
    return delAmbiente;
  }
}
