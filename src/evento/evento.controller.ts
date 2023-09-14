import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EventoService } from './evento.service';
import { eventoDto } from './dto/evento.dto';
import {
  eliminarEventoDto,
  eliminarEventoEspecificoDto,
} from './dto/eliminarEvento.dto';

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
    return await this.eventoService.obtenerEventosPorFecha(
      mes,
      year,
      ambiente,
      horario,
    );
  }

  @Get('/especificos/:mes/:year/:instructor/:instructor')
  async obtenerEventosEspecificos(
    @Param('mes') mes: number,
    @Param('year') year: number,
    @Param('instructor') instructor: string,
  ) {
    return await this.eventoService.obtenerEventosEspecificos(
      mes,
      year,
      instructor,
    );
  }

  @Get('/validar-tiempos')
  async validarTiempos(@Body() payload: eventoDto) {
    return await this.eventoService.validarTiempos(payload);
  }

  @Delete('/eliminar')
  async eliminarEvento(@Body() payload: eliminarEventoDto) {
    return this.eventoService.eliminarEvento(payload);
  }

  @Delete('/eliminar/especifico')
  async eliminarEventoEspecifico(
    @Body() eventoEspecificoDto: eliminarEventoEspecificoDto,
  ) {
    return await this.eventoService.eliminarEventoEspecifico(
      eventoEspecificoDto,
    );
  }
}
