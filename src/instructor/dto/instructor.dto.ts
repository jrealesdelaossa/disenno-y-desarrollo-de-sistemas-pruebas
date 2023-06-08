import {
  IsMongoId,
  IsNotEmpty,
  Matches,
  IsString,
  IsEmail,
} from 'class-validator';
import { ContratoDto } from './contrato.dto';

export class InstructorDto {
  @Matches(/^(?!\s*$).+/, { message: 'El documento no puede ser estar vacío' })
  readonly documento: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El apellido no puede ser estar vacío' })
  readonly apellido: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El correo no puede ser estar vacío' })
  readonly correo: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El celular no puede ser estar vacío' })
  readonly celular: string;

  @IsNotEmpty()
  readonly contrato: ContratoDto;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'La jornada no puede ser estar vacía' })
  readonly jornada: string;
}

export class ActualizarInstructorDto {
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @Matches(/^(?!\s*$).+/, { message: 'El documento no puede ser estar vacío' })
  readonly documento: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly apellido: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsMongoId()
  readonly correo: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly celular: string;

  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
  readonly contrato: ContratoDto;
}
