import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActualizarRegionalDto, RegionalDto } from './dto/regional.dto';
import { RegionalService } from './regional.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Regional')
@Controller('regional')
export class RegionalController {
  constructor(private readonly regional: RegionalService) {}
  @Get()
  async obtenerRegionales() {
    return await this.regional.obtenerRegionales();
  }

  @ApiBody({
    type: RegionalDto,
  })
  @Post('/crear')
  async crearRegional(@Body() regional: RegionalDto) {
    const data = await this.regional.crearRegional(regional);
    // console.log(data);
    return `Regional creada con exito
    ${data}`;
  }

  @ApiParam({
    name: 'id',
    description: 'id de la regional',
  })
  @Delete('/eliminar/:id')
  async eliminarRegional(@Param('id') id: string) {
    return await this.regional.eliminarRegional(id);
  }

  // modificar
  // @Put('modificar/:id')
  // async updateRegional(@Param('id') id: string, @Body() payload: any) {
  //   return await this.regional.update_regional(id, payload);
  // }

  @Put('actualizar')
  async actualizarRegional(@Body() payload: ActualizarRegionalDto) {
    return await this.regional.actualizarRegional(payload);
  }
}
