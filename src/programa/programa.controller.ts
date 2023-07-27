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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { string } from 'joi';

@ApiTags('Programas')
@Controller('programas')
export class ProgramaController {
  constructor(private readonly Programa: ProgramaService) {}

  @Get()
  async obtenerTodo() {
    return await this.Programa.obtenerTodo();
  }

  @ApiParam({ name: 'id', type: String, description: 'El id de un programa' })
  @Get('/:id')
  async obtenerPrograma(@Param('id') id: string) {
    return await this.Programa.obtenerProgramaId(id);
  }

  @ApiBody({
    type: ProgramaDto,
  })
  @Post('/crear')
  async crearProgramas(@Body() Programa: ProgramaDto) {
    console.log(Programa);
    return await this.Programa.crearPrograma(Programa);
  }

  @ApiParam({ name: 'id', type: Number, description: 'El id de un programa' })
  @Delete('/eliminar/:id')
  async borrarProgramas(@Param('id') id: string) {
    return await this.Programa.borrarPrograma(id);
  }

  @ApiBody({
    type: ActualizarProgramaDto,
  })
  @Put('actualizar')
  async actualizarProgramas(@Body() Programa: ActualizarProgramaDto) {
    return await this.Programa.actualizarPrograma(Programa);
  }
}
