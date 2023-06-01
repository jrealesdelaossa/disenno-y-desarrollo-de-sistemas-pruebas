import { Module } from '@nestjs/common';
import { ProgramaController } from './programa.controller';
import { ProgramaService } from './programa.service';

@Module({
  controllers: [ProgramaController],
  providers: [ProgramaService],
})
export class ProgramaModule {}
