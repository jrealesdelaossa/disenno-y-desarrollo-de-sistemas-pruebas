import { Controller, Post } from '@nestjs/common';
import { GestorDisponibilidadService } from './gestor-disponibilidad.service';

@Controller('gestor-disponibilidad')
export class GestorDisponibilidadController {
    constructor(private readonly gestordisponibilidadService: GestorDisponibilidadService) {}

  @Post('/crear')
  crearDisponibilidad() {
     return this.gestordisponibilidadService.crearDisponibilidad();
  }
}
