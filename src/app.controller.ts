import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//import moment from 'moment';

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
    var moment = require('moment');
    return {
      mesNum: moment().month() + 1,
      mes: moment().format('MMMM'),
      year: moment().year(),
    };
  }
}
