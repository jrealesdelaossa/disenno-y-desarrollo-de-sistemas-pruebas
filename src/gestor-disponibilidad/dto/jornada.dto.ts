import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';

export class jornadaDto {
  @ApiProperty({ type: String, default: null })
  readonly morning: string;

  @ApiProperty({ type: String, default: null })
  readonly afternoon: string;

  @ApiProperty({ type: String, default: null })
  readonly night: string;

  
}
