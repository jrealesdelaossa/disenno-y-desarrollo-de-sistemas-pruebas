import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SedesService } from './sedes.service';
import { CreateSede_Dto, Sede_Dto } from './dto/sedes.dto';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sede: SedesService) {}
  @Get()
  async getAll() {
    return await this.sede.findAll();
  }
  @Post('/crear')
  async create(@Body() sede: Sede_Dto) {
    const data = await this.sede.crear_sede(sede);
    console.log(data);
    return 'Sede Creada';
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.sede.borrar_sede(id);
  }
  @Put('actualizar')
  async updateBlock(@Body() sede: CreateSede_Dto) {
    return await this.sede.updateSede(sede);
  }
}
