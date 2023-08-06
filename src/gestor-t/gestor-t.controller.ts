import { Controller, Get, Param } from '@nestjs/common';
import { GestorTService } from './gestor-t.service';

@Controller('gestor-t')
export class GestorTController {
  constructor(private readonly gestorTService: GestorTService) {}

  @Get()
  async obtenerTodo() {
    return await this.gestorTService.obtenerTodo();
  }

  @Get('/:ficha')
  async obtenerGestor(@Param('ficha') ficha: string) {
    return await this.gestorTService.obtenerGestor(ficha);
  }
}
