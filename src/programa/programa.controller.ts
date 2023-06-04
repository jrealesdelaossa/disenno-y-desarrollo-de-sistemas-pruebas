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
import { competenciaDto } from './dto/competencia.dto';

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
  @Post('/crearCompetencia/:id')
  async crearCompetencias(
    @Body() Competencia: competenciaDto,
    @Param('id') id: string,
  ) {
    return await this.Programa.crearCompetencia(Competencia, id);
  }

  @Delete(':id')
  async borrarProgramas(@Param('id') id: string) {
    return await this.Programa.borrarPrograma(id);
  }
  @Delete('eliminarCompetencia/:id/:codigo')
  async borrarCompetencia(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
  ) {
    return await this.Programa.borrarCompetencia(id, codigo);
  }

  @Put('actualizar')
  async actualizarProgramas(@Body() Programa: ActualizarProgramaDto) {
    return await this.Programa.actualizarPrograma(Programa);
  }
}
