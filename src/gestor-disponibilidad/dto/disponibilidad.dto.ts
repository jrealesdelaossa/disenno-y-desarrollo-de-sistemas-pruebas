import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { jornadaDto } from './jornada.dto';
import { ApiProperty } from '@nestjs/swagger';

export class disponibilidadDto {
  @ApiProperty({ type: String, default: '60f0a9a0e1b7c80f3c0f0b0a' })
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del ambiente no puede estar vacío',
  })
  readonly codigo: string;

  @ApiProperty({ type: String, default: 'Nombre del ambiente' })
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;


  @IsOptional()
  @IsNotEmpty()
  readonly calendario: jornadaDto[];
}
