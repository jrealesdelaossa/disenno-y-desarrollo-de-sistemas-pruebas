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
  async obtenerTodo() {
    return await this.sede.obtenerTodo();
  }
  @Post('/crear')
  async crearSedes(@Body() sede: SedeDto) {
    return await this.sede.crearSede(sede);
  }

  @Delete(':id')
  async borrarSedes(@Param('id') id: string) {
    return await this.sede.borrarSede(id);
  }

  @Put('actualizar')
  async actualizarSedes(@Body() sede: ActualizarSedeDto) {
    return await this.sede.actualizarSede(sede);
  }
}
