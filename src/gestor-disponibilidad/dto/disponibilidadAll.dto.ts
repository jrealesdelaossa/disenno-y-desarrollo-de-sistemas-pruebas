import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { disponibilidadDto } from './disponibilidad.dto';
import { ApiProperty } from '@nestjs/swagger';

export class disponibilidadAllDto {



  @IsOptional()
  @IsNotEmpty()
  readonly ambientes: disponibilidadDto[];
}
