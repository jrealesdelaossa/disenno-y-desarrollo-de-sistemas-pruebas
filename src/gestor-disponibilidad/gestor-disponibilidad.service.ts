import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Disponibilidad } from './schema/disponibilidad.schema';
import { Model } from 'mongoose';
import { AmbienteService } from '../ambiente/ambiente.service';
import { disponibilidadAllDto } from './dto/disponibilidadAll.dto';

@Injectable()
export class GestorDisponibilidadService {
  constructor(
    @InjectModel(Disponibilidad.name)
    private disponibilidadModel: Model<Disponibilidad>,
    private ambiente: AmbienteService,
  ) {}

  async crearDisponibilidad(): Promise<string> {
    const ambientesall = await this.ambiente.getAllAmbientes();
    const ambientes = {
      ambientes: [],
    };
    for (const data of ambientesall) {
      const amb = {
        codigo: data._id,
        nombre: `${data.bloque.nomenclatura}-${data.codigo}`,
        calendario: [],
      };
      let pos = 1;
      while (pos <= 31) {
        const jornada = {
          morning: null,
          afternoon: null,
          night: null,
        };
        amb.calendario.push(jornada);
        pos += 1;
      }
      ambientes.ambientes.push(amb);
    }

    this.crearDisponibili(ambientes);

    return 'Gestor de Disponibilidad Creado';
  }

  async crearDisponibili(
    disponibilidad: disponibilidadAllDto,
  ): Promise<Disponibilidad> {
    const newDisponibilidad = new this.disponibilidadModel(disponibilidad);
    return await newDisponibilidad.save();
  }
}
