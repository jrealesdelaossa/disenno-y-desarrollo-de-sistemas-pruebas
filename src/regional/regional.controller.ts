import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Regional_Dto } from './dto/regional.dto';
import { RegionalService } from './regional.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Regional')
@Controller('regional')
export class RegionalController {
  constructor(private readonly regional: RegionalService) {}
  @Get()
  async findAll() {
    return await this.regional.findAll();
  }

  @Post('/crear')
  async create(@Body() regional: Regional_Dto) {
    const data = await this.regional.create_regional(regional);
    // console.log(data);
    return `Regional creada con exito
    ${data}`;
  }

  @ApiParam({
    name: 'id',
  })
  @Delete('/eliminar/:id')
  async deleteRegional(@Param('id') id: string) {
    return await this.regional.delete_regional(id);
  }

  // modificar
  // @Put('modificar/:id')
  // async updateRegional(@Param('id') id: string, @Body() payload: any) {
  //   return await this.regional.update_regional(id, payload);
  // }

  @Put('modificarDos')
  async updateRegional(@Body() payload: any) {
    return await this.regional.update_regional(payload);
  }
}
