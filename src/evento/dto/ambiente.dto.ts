import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ambienteDto {
  @ApiProperty({
    type: String,
    default: '165546545674118916116',
    description: 'id del ambiente',
  })
  @Matches(/^(?!\s*$).+/, {
    message: 'El id del ambiente no puede estar vacío',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;

  @ApiProperty({
    type: String,
    default: 'C-201',
    description: 'Ambiente',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'El nombre del ambiente no puede estar vacío',
  })
  readonly ambiente: string;
}
