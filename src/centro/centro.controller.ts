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

@Controller('centro')
export class CentroController {
  constructor(private readonly centro: CentroService) {}

  @Get()
  async obtenerTodo() {
    return await this.centro.obtenerTodo();
  }

  @Post('/crear')
  async crearCentro(@Body() centro: CentroDto) {
    return await this.centro.crearCentro(centro);
  }

  @Delete('/eliminar/:id')
  async eliminarCentro(@Param('id') id: string) {
    return await this.centro.eliminarCentro(id);
  }

  @Put('/editar')
  async actualizarCentro(@Body() centro: ActualizarCentroDto) {
    return await this.centro.actualizarCentro(centro);
  }
}
