import { IsNotEmpty, Length, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Length(5, 20)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Length(6, 50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener Mayusculas, minusculas y numeros',
  })
  readonly password: string;
}
/*
export class ActualizarRegionalDto {
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
*/
