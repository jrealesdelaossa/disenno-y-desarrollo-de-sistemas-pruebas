import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CentroService } from './centro.service';
import { CentroDto, ActualizarCentroDto } from './dto/centro.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Centro')
@Controller('centro')
export class CentroController {
  constructor(private readonly centro: CentroService) {}

  @Get()
  async obtenerTodo() {
    return await this.centro.obtenerTodo();
  }

  @ApiBody({
    type: CentroDto,
  })
  @Post('/crear')
  async crearCentro(@Body() centro: CentroDto) {
    return await this.centro.crearCentro(centro);
  }

  @ApiParam({
    description: 'Id del centro',
    name: 'id',
  })
  @Delete('/eliminar/:id')
  async eliminarCentro(@Param('id') id: string) {
    return await this.centro.eliminarCentro(id);
  }

  @ApiBody({
    type: ActualizarCentroDto,
  })
  @Put('/editar')
  async actualizarCentro(@Body() centro: ActualizarCentroDto) {
    return await this.centro.actualizarCentro(centro);
  }
}
