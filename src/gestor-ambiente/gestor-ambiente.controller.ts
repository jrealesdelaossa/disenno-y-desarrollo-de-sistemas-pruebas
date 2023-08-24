import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GestorAmbienteService } from './gestor-ambiente.service';
import { CreateGestorAmbienteDto } from './dto/gestor-ambiente.dto';

@Controller('gestor-ambiente')
export class GestorAmbienteController {
  constructor(private readonly gestorAmbienteService: GestorAmbienteService) {}

  @Post()
  crearGestorActual() {
    return this.gestorAmbienteService.crearGestorActual();
  }

  @Get()
  findAll() {
    return this.gestorAmbienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gestorAmbienteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gestorAmbienteService.remove(+id);
  }
}
