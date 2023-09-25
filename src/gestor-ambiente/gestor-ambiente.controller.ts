import { Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { GestorAmbienteService } from './gestor-ambiente.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidateObjectidPipe } from 'src/common/validate-objectid/validate-objectid.pipe';

@ApiTags('gestor-ambiente')
@Controller('gestor-ambiente')
export class GestorAmbienteController {
  constructor(private readonly gestorAmbienteService: GestorAmbienteService) {}

  @Post('/crear/:centro')
  @ApiParam({
    name: 'centro',
    description: 'id de un centro',
  })
  async crearGestorActual(
    @Param('centro', ValidateObjectidPipe) centro: string,
  ) {
    return await this.gestorAmbienteService.crearGestorActual(centro);
  }

  @Put('/reiniciar/:centro')
  async reiniciarDisponibilidadCentro(
    @Param('centro', ValidateObjectidPipe) centro: string,
  ) {
    return await this.gestorAmbienteService.reiniciarDisponibilidadCentro(
      centro,
    );
  }

  @Get()
  async findAll() {
    return await this.gestorAmbienteService.findAll();
  }

  @Get('/centro/:centro')
  async findByCentro(@Param('centro', ValidateObjectidPipe) centro: string) {
    return await this.gestorAmbienteService.findByCentro(centro);
  }

  @Get('/sede/:sede')
  async findBySede(@Param('sede', ValidateObjectidPipe) sede: string) {
    return await this.gestorAmbienteService.findBySede(sede);
  }
}
