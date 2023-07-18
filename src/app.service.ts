import { Injectable } from '@nestjs/common';
import { now } from 'mongoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Sena!';
  }
}
