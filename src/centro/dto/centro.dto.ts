import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, Matches } from 'class-validator';
export class CentroDto {
  @ApiPropertyOptional({
    default: '647b9c8b6d094d14b42f8a98',
  })
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @ApiProperty({
    default: '123456789',
  })
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El codigo no puede ser estar vacío' })
  readonly codigo: string;

  @ApiProperty({
    default: 'Centro',
  })
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede ser estar vacío' })
  readonly nombre: string;

  @ApiProperty({
    default: '647b9c8b6d094d14b42f8a98',
    description: 'Id de la regional',
  })
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La regional no puede ser estar vacía' })
  @IsMongoId()
  readonly regional: string;

  @ApiProperty({
    default: '647b9c8b6d094d14b42f8a98',
  })
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
