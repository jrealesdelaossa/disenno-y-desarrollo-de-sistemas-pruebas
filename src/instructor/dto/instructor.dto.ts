import {
  IsMongoId,
  IsNotEmpty,
  Matches,
  IsString,
  IsEmail,
  IsArray,
} from 'class-validator';
import { ContratoDto } from './contrato.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InstructorDto {
  @ApiProperty()
  @Matches(/^(?!\s*$).+/, { message: 'El documento no puede ser estar vacío' })
  readonly documento: string;

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
  @IsArray()
  readonly programas: string[];

  @ApiProperty()
  @Matches(/^(?!\s*$).+/, { message: 'La Sede no puede estar vacía' })
  readonly sede: string;
}

export class ActualizarInstructorDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @ApiProperty()
  @Matches(/^(?!\s*$).+/, { message: 'El documento no puede ser estar vacío' })
  readonly documento: string;

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
}
