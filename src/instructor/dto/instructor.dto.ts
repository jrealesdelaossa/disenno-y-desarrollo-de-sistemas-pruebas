import {
  IsMongoId,
  IsNotEmpty,
  Matches,
  IsString,
  IsEmail,
} from 'class-validator';
import { ContratoDto } from './contrato.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InstructorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El apellido no puede ser estar vacío' })
  readonly apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El correo no puede ser estar vacío' })
  readonly correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El celular no puede ser estar vacío' })
  readonly celular: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly contrato: ContratoDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'La jornada no puede ser estar vacía' })
  readonly jornada: string;
}

export class ActualizarInstructorDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsMongoId()
  readonly correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly celular: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly contrato: ContratoDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly jornada: string;
}
