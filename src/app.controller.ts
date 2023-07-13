import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import moment from 'moment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Crear el EndPoint de la fecha en el appController
   * Mes en Numero y en letra, anio en Numero
   */
  @Get('date')
  getDatosFecha() {
    return [moment().month() + 1, moment().format('MMMM'), moment().year()];
  }
}
