import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { eventosDto } from './eventos.dto';

export class eventoDto {
  @ApiProperty({
    type: Number,
    default: '12',
    description: 'Mes',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly mes: number;

  @ApiProperty({
    type: Number,
    default: '2023',
    description: 'Año',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: String,
    default: '231321231651651513',
    description: 'Instuctor relacionado',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly instructor: string;

  @ApiProperty({
    type: Array,
  })
  @IsNotEmpty()
  @IsArray()
  readonly eventos: eventosDto[];
}
