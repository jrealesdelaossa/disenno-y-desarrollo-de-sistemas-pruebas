import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ActualizarProgramaDto, ProgramaDto } from './dto/programa.dto';

@Controller('programas')
export class ProgramaController {
  constructor(private readonly Programa: ProgramaService) {}

  @Get()
  async obtenerTodo() {
    return await this.Programa.obtenerTodo();
  }
  @Post('/crear')
  async crearProgramas(@Body() Programa: ProgramaDto) {
    return await this.Programa.crearPrograma(Programa);
  }

  @Delete(':id')
  async borrarProgramas(@Param('id') id: string) {
    return await this.Programa.borrarPrograma(id);
  }

  @Put('actualizar')
  async actualizarProgramas(@Body() Programa: ActualizarProgramaDto) {
    return await this.Programa.actualizarPrograma(Programa);
  }
}
