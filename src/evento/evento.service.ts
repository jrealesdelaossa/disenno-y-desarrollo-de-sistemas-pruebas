import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento } from './schema/evento.schema';
import { eventoDto } from './dto/evento.dto';

@Injectable()
export class EventoService {
  constructor(@InjectModel(Evento.name) private eventoModel: Model<Evento>) {}

  async obtenerEventos(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async crearEvento(evento: eventoDto): Promise<Evento> {
    /*
    const condicionesConsulta = {
      mes: evento.mes,
      year: evento.year,
      'eventos.ambiente.ambiente': evento.eventos[0].ambiente.ambiente,
      'eventos.horario': evento.eventos[0].horario,
    };
    */

    const mesConsulta = evento.mes;
    const yearConsulta = evento.year;

    const condicionesConsulta = evento.eventos.map((evento) => {
      return {
        mes: mesConsulta,
        year: yearConsulta,
        'eventos.ambiente.ambiente': evento.ambiente.ambiente,
        'eventos.horario': evento.horario,
      };
    });

    console.log(condicionesConsulta);

    const numeroEventoEncontrado = await this.eventoModel.countDocuments({
      //...condicionesConsulta,
      $or: condicionesConsulta,
    });

    console.log('Conteo de eventos ' + numeroEventoEncontrado);

    if (numeroEventoEncontrado > 0) {
      const eventosEncontrados = await this.eventoModel
        .find({
          $or: condicionesConsulta,
        })
        .exec();
      throw new ConflictException(eventosEncontrados);
    }

    const createdEvento = new this.eventoModel(evento);
    return createdEvento.save();
  }

  async obtenerEventosPorFecha(
    mes: number,
    year: number,
    ambiente: string,
    horario: string,
  ): Promise<boolean> {
    const evento = await this.eventoModel
      .find({
        mes: mes,
        year: year,
        'eventos.ambiente.ambiente': ambiente,
        'eventos.horario': horario,
      })
      .exec();

    return evento.length > 0 ? true : false;
  }
}
