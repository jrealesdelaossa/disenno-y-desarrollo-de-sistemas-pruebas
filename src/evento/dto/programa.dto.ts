import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Matches } from 'class-validator';

export class programaDto {
  @ApiProperty({
    type: String,
    default: 'Programa de formación',
    description: 'Nombre del programa',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El nombre del programa no puede estar vacío',
  })
  readonly nombre: string;

  @ApiProperty({
    type: String,
    default: '236236',
    description: 'id del programa',
  })
  @Matches(/^(?!\s*$).+/, {
    message: 'El id del programa no puede estar vacío',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
