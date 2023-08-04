import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GestorTService } from './gestor-t.service';
import { gestorTDto } from './dto/gestor-t.dto';

@Controller('gestor-t')
export class GestorTController {
  constructor(private readonly gestorTService: GestorTService) {}

  @Post('/crear')
  async crearGestor(@Body() GestorTDto: gestorTDto) {
    return this.gestorTService.crearGestor(GestorTDto);
  }

  @Get()
  async obtenerTodo() {
    return this.gestorTService.obtenerTodo();
  }

  @Get('/:ficha')
  async obtenerGestor(@Param('ficha') ficha: string) {
    return this.gestorTService.obtenerGestor(ficha);
  }
}
