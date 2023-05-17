import { Controller, Get, Post } from '@nestjs/common';
import { BloqueService } from './bloque.service';

@Controller('bloque')
export class BloqueController {
  constructor(private readonly bloqueService: BloqueService) {}

  @Get()
  async findAllBlock() {
    return await this.bloqueService.findAllBlock();
  }

  @Post('crear')
  async createBlock() {
    return await this.bloqueService.createBlock();
  }
}
