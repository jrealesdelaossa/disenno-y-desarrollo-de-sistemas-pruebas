import { IsMongoId, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CentroDto {
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly codigo: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly nombre: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsMongoId()
  readonly regional: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly municipio: string;
}

export class ActualizarCentroDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  @IsOptional()
  readonly codigo: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  @IsOptional()
  readonly nombre: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsOptional()
  readonly regional: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  @IsOptional()
  readonly municipio: string;
}
