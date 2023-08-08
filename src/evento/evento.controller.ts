import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EventoService } from './evento.service';
import { eventoDto } from './dto/evento.dto';

@ApiTags('Evento')
@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  async obtenerEventos() {
    return await this.eventoService.obtenerEventos();
  }

  @ApiBody({ type: eventoDto })
  @Post('/crear')
  async crearEvento(@Body() evento: eventoDto) {
    return await this.eventoService.crearEvento(evento);
  }

  @Get('/fecha/:mes/:year/ambiente/:ambiente/horario/:horario')
  async obtenerEventosPorFecha(
    @Param('mes') mes: number,
    @Param('year') year: number,
    @Param('ambiente') ambiente: string,
    @Param('horario') horario: string,
  ) {
    console.log(mes, year, ambiente, horario);

    return await this.eventoService.obtenerEventosPorFecha(
      mes,
      year,
      ambiente,
      horario,
    );
  }

  @Get('/validar-tiempos')
  async validarTiempos(@Body() payload: eventoDto) {
    return await this.eventoService.validarTiempos(payload);
  }
}
