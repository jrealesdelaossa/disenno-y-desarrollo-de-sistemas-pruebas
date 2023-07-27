import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { resultadoDto } from './resultado.dto';

export class competenciasDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly codigo: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, { message: 'La duración no puede ser estar vacío' })
  @IsNumber()
  @IsNotEmpty()
  readonly duracion: number;

  @IsOptional()
  @IsNotEmpty()
  readonly resultados: resultadoDto[];
}
