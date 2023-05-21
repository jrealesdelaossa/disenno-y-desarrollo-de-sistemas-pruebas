import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BloqueService } from './bloque.service';
import { CrearBloqueDto, ActualizarBloqueDto } from './dto/bloque.dto';

@Controller('bloque')
export class BloqueController {
  constructor(private readonly bloqueService: BloqueService) {}

  @Get()
  async findAllBlock() {
    return await this.bloqueService.obtenerBloques();
  }

  @Get('/:id')
  async findOneBlock(@Param('id') id: string) {
    return await this.bloqueService.obtenerBloque(id);
  }

  @Post('/crear')
  async crearBloque(@Body() bloqueDto: CrearBloqueDto) {
    console.log(bloqueDto);

    return await this.bloqueService.crearBloque(bloqueDto);
  }

  @Put('/actualizar')
  async actualizarBloque(@Body() bloqueDto: ActualizarBloqueDto) {
    console.log(bloqueDto.id);

    return await this.bloqueService.actualizarBloque(bloqueDto);
  }

  @Delete('/eliminar/:id')
  async deleteBlock(@Param('id') id: string) {
    return await this.bloqueService.eliminarBloque(id);
  }
}
