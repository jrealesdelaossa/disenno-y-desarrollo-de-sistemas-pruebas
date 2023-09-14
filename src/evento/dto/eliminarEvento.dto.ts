import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { number } from 'joi';
import { eventosDto } from './eventos.dto';

export class eliminarEventoDto {
  @ApiProperty({
    type: Number,
    default: '12',
    description: 'Mes del evento',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly mes: number;

  @ApiProperty({
    type: Number,
    default: '2023',
    description: 'Año del evento',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: String,
    default: '231321231651651513',
    description: 'ObjectId del instructor',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly instructor: string;

  @ApiProperty({
    type: String,
    default: 'M-105',
    description: 'Ambiente del evento',
  })
  @IsNotEmpty()
  @IsString()
  readonly ambiente: string;

  @ApiProperty({
    type: String,
    default: '12-18',
    description: 'Horario del evento',
  })
  @IsNotEmpty()
  @IsString()
  readonly horario: string;

  @ApiProperty({
    type: number,
    default: 14,
    description: 'Día del evento',
  })
  @IsNotEmpty()
  @IsArray()
  readonly diasTrabajados: number[];

  @ApiProperty({
    type: number,
    default: 14,
    description: 'Horas a eliminar',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly horas: number;
}

export class eliminarEventoEspecificoDto {
  @ApiProperty({
    type: String,
    default: '231321231651651513',
    description: 'Instuctor relacionado',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly instructor: string;

  @ApiProperty({
    type: Object,
  })
  @IsNotEmpty()
  @IsObject()
  readonly evento: eventosDto;

  @ApiProperty({
    type: Number,
    default: '0',
    description: 'Posición del evento a eliminar',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly eventIndex: number;
}
