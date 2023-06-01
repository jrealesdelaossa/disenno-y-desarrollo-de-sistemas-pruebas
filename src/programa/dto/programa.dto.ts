import { IsMongoId, IsNotEmpty, Matches } from 'class-validator';

export class ProgramaDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly cod_programa: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El tipo de formacion no puede ser estar vacío',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly tipo_formacion: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly version: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion_horas: string;
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
  readonly cod_programa: string;

  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsNotEmpty()
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El tipo de formacion no puede ser estar vacío',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly tipo_formacion: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly version: string;

  @Matches(/^(?!\s*$).+/, { message: 'La version no puede ser estar vacío' })
  @IsNotEmpty()
  readonly duracion_horas: string;
}
