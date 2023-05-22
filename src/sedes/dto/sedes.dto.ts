import { IsMongoId, IsNotEmpty, Matches } from 'class-validator';

export class SedeDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Nombre no puede ser estar vacío' })
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, { message: 'El centro no puede ser estar vacío' })
  @IsNotEmpty()
  readonly centro: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El lugar de funcionamiento no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly lugar_funcionamiento: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El departamento no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly departamento: string;

  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  @IsNotEmpty()
  readonly municipio: string;
}
export class CreateSedeDto {
  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'El Id no puede ser estar vacío' })
  readonly id: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Nombre no puede ser estar vacío' })
  readonly nombre: string;

  @Matches(/^(?!\s*$).+/, { message: 'El centro no puede ser estar vacío' })
  @IsNotEmpty()
  readonly centro: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El lugar de funcionamiento no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly lugar_funcionamiento: string;

  @Matches(/^(?!\s*$).+/, {
    message: 'El departamento no puede ser estar vacío',
  })
  @IsNotEmpty()
  readonly departamento: string;

  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  @IsNotEmpty()
  readonly municipio: string;
}
