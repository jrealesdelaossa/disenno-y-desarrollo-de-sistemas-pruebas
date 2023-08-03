import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
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

  async crearEvento(evento: eventoDto) {
    // * Extracción de datos para la consulta
    const mesConsulta = evento.mes;
    const yearConsulta = evento.year;

    const condicionesConsulta = evento.eventos.map((evento) => {
      return {
        mes: mesConsulta,
        year: yearConsulta,
        'eventos.ambiente.ambiente': evento.ambiente.ambiente,
        'eventos.horario': evento.horario,
        // 'eventos.diainicial': evento.diainicial,
      };
    });

    // ? console.log('Condiciones de consulta \n', condicionesConsulta);

    // * Consulta de eventos existentes
    const eventosEncontrados = await this.eventoModel
      .find({
        $or: condicionesConsulta,
      })
      .exec();
    // console.log('Eventos encontrados\n' + eventosEncontrados);

    // TODO: Refactorizar la validación de dias
    let diasNuevos = evento.eventos.map((evento) => {
      return evento.diastrabajados;
    });

    let diasExistentes = eventosEncontrados.map((evento) => {
      return evento.eventos.map((evento) => evento.diastrabajados);
    });

    diasNuevos = [].concat(...diasNuevos);
    diasExistentes = [].concat(...diasExistentes);

    const arrExisteDia = diasNuevos.map((dia) => {
      return diasExistentes.some((arrdias) => arrdias.some((i) => i === dia));
    });

    const existeDia = arrExisteDia.every((item) => item === false);

    // TODO: -----------------------------------------------

    if (eventosEncontrados.length > 0 && !existeDia) {
      const eventosEncontrados = await this.eventoModel
        .find({
          $or: condicionesConsulta,
        })
        .exec();
      throw new ConflictException(eventosEncontrados);
    }

    const createdEvento = new this.eventoModel(evento);
    createdEvento.save();
    return {
      statusCode: HttpStatus.CREATED,
      message: createdEvento,
    };
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
