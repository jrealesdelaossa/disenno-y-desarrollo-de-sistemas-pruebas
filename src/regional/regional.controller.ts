import { Body, Controller, Get, Post } from '@nestjs/common';
import { Regional_Dto } from './dto/regional.dto';
import { RegionalService } from './regional.service';
@Controller('regional')
export class RegionalController {
  constructor(private readonly regional: RegionalService) {}
  @Get()
  findAll(): string {
    return 'retorna las regionales';
  }

  @Post('/crear')
  async create(@Body() regional: Regional_Dto) {
    const data = await this.regional.create_regional(regional);
    console.log(data);
    return 'Creando regional';
  }
}
