import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  IsDateString,
} from 'class-validator';
export class FichaDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly codigo: string;

  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'La jornada no puede ser estar vacía' })
  readonly jornada: string;

  @IsNotEmpty()
  @IsDateString()
  readonly fechaCreacion: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly fechaFinalizacion: Date;

  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'ambiente no puede ser estar vacío' })
  readonly ambiente: string;

  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'programa no puede ser estar vacío' })
  readonly programa: string;

  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, { message: 'instructor no puede ser estar vacío' })
  readonly instructor: string;
}

export class ActualizarFichaDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly codigo: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly jornada: string;

  @IsNotEmpty()
  @IsDateString()
  readonly fechaCreacion: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly fechaFinalizacion: Date;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly ambiente: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly programa: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  readonly instructor: string;
}
