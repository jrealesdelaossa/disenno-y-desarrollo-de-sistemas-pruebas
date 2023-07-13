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
import { resultadoDto } from './dto/resultado.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Programas')
@Controller('programas')
export class ProgramaController {
  constructor(private readonly Programa: ProgramaService) {}

  @Get()
  async obtenerTodo() {
    return await this.Programa.obtenerTodo();
  }
  @Get('/:id')
  async obtenerPrograma(@Param('id') id: string) {
    return await this.Programa.obtenerProgramaId(id);
  }

  @Get('/competencias/:id')
  async obtenerCompetencias(@Param('id') id: string) {
    return await this.Programa.obtenerCompetencias(id);
  }
  @Get('/competencias/:id/:codigo')
  async obtenerCompetenciaId(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
  ) {
    return await this.Programa.obtenerCompetenciasId(id, codigo);
  }
  @Get('competencias/resultados/:id/:codigo')
  async obtenerResultados(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
  ) {
    return await this.Programa.obtenerResultados(id, codigo);
  }

  @Post('/crear')
  async crearProgramas(@Body() Programa: ProgramaDto) {
    return await this.Programa.crearPrograma(Programa);
  }
  @Post('/crear/:id')
  async crearCompetencias(
    @Body() Competencia: competenciaDto,
    @Param('id') id: string,
  ) {
    return await this.Programa.crearCompetencia(Competencia, id);
  }
  @Post('/crear/:id/:codigo')
  async crearResultado(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
    @Body() resultado: resultadoDto,
  ) {
    return await this.Programa.crearResultado(id, codigo, resultado);
  }

  @Delete('/eliminar/:id')
  async borrarProgramas(@Param('id') id: string) {
    return await this.Programa.borrarPrograma(id);
  }
  @Delete('/eliminar/:id/:codigo')
  async borrarCompetencia(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
  ) {
    return await this.Programa.borrarCompetencia(id, codigo);
  }
  @Delete('/eliminar/:id/:codigo/:posicion')
  async borrarResultado(
    @Param('id') id: string,
    @Param('codigo') codigo: string,
    @Param('posicion') posicion: string,
  ) {
    return await this.Programa.borrarResultado(id, codigo, posicion);
  }

  @Put('actualizar')
  async actualizarProgramas(@Body() Programa: ActualizarProgramaDto) {
    return await this.Programa.actualizarPrograma(Programa);
  }
  @Put('actualizar/:id')
  async actualizarCompetencia(
    @Body() competencia: competenciaDto,
    @Param('id') id: string,
  ) {
    return await this.Programa.actualizarCompetencia(id, competencia);
  }
  @Put('/actualizar/:id/:codigo/:posicion')
  async actualizarResultado(
    @Body() resultado: resultadoDto,
    @Param('id') id: string,
    @Param('codigo') codigo: string,
    @Param('posicion') posicion: string,
  ) {
    return await this.Programa.actualizarResultado(
      id,
      codigo,
      posicion,
      resultado,
    );
  }
}
