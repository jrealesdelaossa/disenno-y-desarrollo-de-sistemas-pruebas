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
import { Bloque_Dto } from './dto/bloque.dto';

@Controller('bloque')
export class BloqueController {
  constructor(private readonly bloqueService: BloqueService) {}

  @Get()
  async findAllBlock() {
    return await this.bloqueService.findAllBlock();
  }

  @Get(':id')
  async findOneBlock(@Param('id') id: string) {
    return await this.bloqueService.findOneBlock(id);
  }

  @Post('crear')
  async createBlock(@Body() bloque: Bloque_Dto) {
    return await this.bloqueService.createBlock(bloque);
  }

  @Put('actualizar')
  async updateBlock(@Body() payload: Bloque_Dto) {
    console.log(payload._id);

    return await this.bloqueService.updateBlock(payload);
  }

  @Delete('eliminar/:id')
  async deleteBlock(@Param('id') id: string) {
    return await this.bloqueService.deleteBlock(id);
  }
}
