import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { GestorAmbienteService } from './gestor-ambiente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gestor-ambiente')
@Controller('gestor-ambiente')
export class GestorAmbienteController {
  constructor(private readonly gestorAmbienteService: GestorAmbienteService) {}

  @Post('/crear')
  crearGestorActual() {
    return this.gestorAmbienteService.crearGestorActual();
  }

  @Get()
  findAll() {
    return this.gestorAmbienteService.findAll();
  }

  @Delete('/eliminar-todos')
  async eliminarTodos() {
    return await this.gestorAmbienteService.eliminarTodos();
  }
}
