import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { FichaDto, ActualizarFichaDto } from './dto/ficha.dto';

@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Get()
  async obtenerTodo() {
    return await this.fichaService.obtenerTodo();
  }

  @Get('/:id')
  async obtenerFicha(@Param('id') id: string) {
    return await this.fichaService.obtenerFicha(id);
  }

  @Post('/crear')
  async crearFicha(@Body() ficha: FichaDto) {
    return await this.fichaService.crearFicha(ficha);
  }

  @Put('/actualizar')
  async actualizarFicha(@Body() ficha: ActualizarFichaDto) {
    return await this.fichaService.actualizarFicha(ficha);
  }

  @Delete('/eliminar/:id')
  async eliminarFicha(@Param('id') id: string) {
    return await this.fichaService.eliminarFicha(id);
  }
}
