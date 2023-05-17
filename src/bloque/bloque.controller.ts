import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BloqueService } from './bloque.service';
import { Bloque_Dto } from './dto/bloque.dto';

@Controller('bloque')
export class BloqueController {
  constructor(private readonly bloqueService: BloqueService) {}

  @Get()
  async findAllBlock() {
    return await this.bloqueService.findAllBlock();
  }

  @Post('crear')
  async createBlock(@Body() bloque: Bloque_Dto) {
    return await this.bloqueService.createBlock(bloque);
  }
}
