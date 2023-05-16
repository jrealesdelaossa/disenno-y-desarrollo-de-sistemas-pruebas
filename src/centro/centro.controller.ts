import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CentroService } from './centro.service';
import { Centro_Dto } from './dto/centro.dto';

@Controller('centro')
export class CentroController {
  constructor(private readonly centro: CentroService) {}
  @Get()
  async getAll() {
    return await this.centro.findAll();
  }
  @Post('/crear')
  async create(@Body() centro: Centro_Dto) {
    const data = await this.centro.create_centro(centro);
    console.log(data);
    return 'Creando centro';
  }
  @Delete('/eliminar/:id')
  async deleteCentro(@Param('id') id: string) {
    return await this.centro.delete_centro(id);
  }
}
