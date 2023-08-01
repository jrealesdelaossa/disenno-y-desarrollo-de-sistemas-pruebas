import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class resultadoDto {
  @ApiProperty({
    type: String,
    default: 'Resultado de la competencia',
    description: 'Resultado de la competencia',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El nombre del resultado no puede estar vacío',
  })
  readonly resultado: string;

  @ApiProperty({
    type: Number,
    default: 1,
    description: 'Orden del resultado',
  })
  @Matches(/^(?!\s*$).+/, {
    message: 'El orden del resultado no puede estar vacío',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly orden: number;
}
