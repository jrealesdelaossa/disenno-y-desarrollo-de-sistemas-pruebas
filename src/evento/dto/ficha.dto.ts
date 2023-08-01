import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Matches } from 'class-validator';

export class fichaDto {
  @ApiProperty({
    type: String,
    default: '614b2e3b2b3b1d1d1d1d1d1d',
    description: 'Identificador de la ficha',
  })
  @IsNotEmpty()
  @IsMongoId()
  @Matches(/^(?!\s*$).+/, {
    message: 'El identificador de la ficha no puede estar vacío',
  })
  readonly ficha: string;

  @ApiProperty({
    type: String,
    default: '236236',
    description: 'Código de la ficha',
  })
  @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
  @IsNotEmpty()
  @IsString()
  readonly codigo: string;
}
