import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class competenciaDto {
  @ApiProperty({
    type: String,
    default: 'Nombre de la competencia',
    description: 'Nombre de la competencia',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El nombre de la competencia no puede estar vacío',
  })
  readonly competencia: string;

  @ApiProperty({
    type: String,
    default: '236236',
    description: 'Código de la competencia',
  })
  @Matches(/^(?!\s*$).+/, {
    message: 'El código de la competencia no puede estar vacío',
  })
  @IsNotEmpty()
  @IsString()
  readonly codigo: string;
}
