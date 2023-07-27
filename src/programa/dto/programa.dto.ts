import { IsMongoId, IsOptional, IsNotEmpty, Matches } from 'class-validator';
import { competenciaDto } from './competencia.dto';

export class ProgramaDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly codigo: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El nivel de formacion no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly nivel: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly version: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion: string;

  @IsOptional()
  readonly competencia: competenciaDto[];
}

export class ActualizarProgramaDto {
  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'El Id no puede ser estar vacío' })
  readonly id: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly codigo: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El tipo de formacion no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly nivel: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly version: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion: string;

  @IsOptional()
  readonly competencia: competenciaDto[];
}
