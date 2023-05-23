import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SedesService } from './sedes.service';
import { ActualizarSedeDto, SedeDto } from './dto/sedes.dto';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sede: SedesService) {}

  @Get()
  async getAll() {
    return await this.sede.findAll();
  }
  @Post('/crear')
  async create(@Body() sede: SedeDto) {
    return await this.sede.crear_sede(sede);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.sede.borrar_sede(id);
  }

  @Put('actualizar')
  async updateBlock(@Body() sede: ActualizarSedeDto) {
    return await this.sede.updateSede(sede);
  }
}
