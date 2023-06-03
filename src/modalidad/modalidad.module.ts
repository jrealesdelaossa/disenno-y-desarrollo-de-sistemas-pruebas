import { Module } from '@nestjs/common';
import { Controller } from './.controller';
import { ModalidadController } from './modalidad/modalidad.controller';

@Module({
  controllers: [Controller, ModalidadController]
})
export class ModalidadModule {}
