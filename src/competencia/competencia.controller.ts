import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { competenciaDto } from './dto/competencia.dto';
import { ApiParam } from '@nestjs/swagger';

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

  @Post('/crear')
  crearCompetencia(@Body() competencia: competenciaDto) {
    return this.competenciaService.crearCompetencia(competencia);
  }
}
