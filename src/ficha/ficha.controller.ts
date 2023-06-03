import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { FichaDto, ActualizarFichaDto } from './dto/ficha.dto';

@Controller('ficha')
export class FichaController {
  constructor(private readonly ficha: FichaService) {}

  @Get()
  async obtenerTodo() {
    return await this.ficha.obtenerTodo();
  }

  @Post('/crear')
  async crearFicha(@Body() ficha: FichaDto) {
    return await this.ficha.crearFicha(ficha);
  }
}
