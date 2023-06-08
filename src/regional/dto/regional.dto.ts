import { IsNotEmpty, Length, IsOptional, IsString, Matches,IsMongoId } from 'class-validator';
export class RegionalDto {
  @IsNotEmpty()
  @IsOptional()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  readonly codigo: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly departamento: string;

  @IsNotEmpty()
  @IsString()
  readonly municipio: string;

  
}

export class ActualizarRegionalDto{
  
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede estar vacío' })
  @IsMongoId()
  readonly id: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede estar vacío' })
  @IsOptional()
  readonly codigo: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
  @IsOptional()
  readonly nombre: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El departamento no puede estar vacía' })
  @IsOptional()
  readonly departamento: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede estar vacío' })
  @IsOptional()
  readonly municipio: string;

}
