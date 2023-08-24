import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { log } from 'console';
//import moment from 'moment';
// import fc from 'festivos-colombia';
const fc = require('festivos-colombia');

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
    const moment = require('moment');
    return {
      mesNum: moment().month() + 1,
      mes: moment().format('MMMM'),
      year: moment().year(),
    };
  }

  /**
   * Obtener festivos filtrando por año y por mes
   * @param year Año para consultar los festivos
   * @param month Mes para consultar los festivos
   * @returns Lista de festivos
   */
  @Get('festivos/:year/:month')
  getFestivos(@Param('year') year: string, @Param('month') month: string) {
    const diasFestivos = fc.getHolidaysByYear(year);
    const festivosResponse = [];

    diasFestivos.forEach((element) => {
      const mes = element.date.split('/')[1];
      if (mes == month) {
        festivosResponse.push(element);
      }
    });

    return festivosResponse;
  }
}
