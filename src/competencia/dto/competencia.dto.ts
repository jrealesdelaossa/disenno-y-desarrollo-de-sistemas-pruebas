import { IsMongoId, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { competenciasDto } from './competencias.dto';
import { ApiProperty } from '@nestjs/swagger';

export class competenciaDto {
  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly programa: string;

  @IsOptional()
  @IsNotEmpty()
  readonly competencias: competenciasDto[];
}

export class actualizarCompetenciaDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El id no puede ser estar vacío' })
  @IsMongoId()
  readonly id: string;

  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, {
    message: 'El codigo del programa no puede estar vacío',
  })
  readonly programa: string;

  @IsOptional()
  @IsNotEmpty()
  readonly competencias: competenciasDto[];
}
