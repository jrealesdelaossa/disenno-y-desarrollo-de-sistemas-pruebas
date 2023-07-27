import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import {
  actualizarCompetenciaDto,
  competenciaDto,
} from './dto/competencia.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Competencia')
@Controller('competencia')
export class CompetenciaController {
  constructor(private readonly competenciaService: CompetenciaService) {}

  @Get()
  obtenerCompetencias() {
    return this.competenciaService.obtenerCompetencias();
  }

  @ApiParam({ name: 'idProgram', type: String })
  @Get('/programa/:idProgram')
  obtenerCompetenciasPorPrograma(@Param('idProgram') idProgram: string) {
    return this.competenciaService.obtenerCompetenciasPorPrograma(idProgram);
  }

  @ApiBody({ type: competenciaDto })
  @Post('/crear')
  crearCompetencia(@Body() competencia: competenciaDto) {
    return this.competenciaService.crearCompetencia(competencia);
  }

  @ApiBody({ type: actualizarCompetenciaDto })
  @Put('/actualizar/')
  actualizarResultados(@Body() resultado: actualizarCompetenciaDto) {
    return this.competenciaService.actualizarResultados(resultado);
  }
}
