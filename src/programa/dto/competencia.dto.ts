import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { resultadoDto } from './resultado.dto';

export class competenciaDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly codigo: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion: string;

  @IsNotEmpty()
  readonly resultado: resultadoDto[];
}
