import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsOptional, IsString } from 'class-validator';
export class Regional_Dto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  private id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  private codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private departamento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  private municipio: string;

  public get _id(): string {
    return this.id;
  }

  public get _codigo(): string {
    return this.codigo;
  }
  public set _codigo(value: string) {
    this.codigo = value;
  }

  public get _nombre(): string {
    return this.nombre;
  }
  public set _nombre(value: string) {
    this.nombre = value;
  }

  public get _municipio(): string {
    return this.municipio;
  }
  public set _municipio(value: string) {
    this.municipio = value;
  }

  public get _departamento(): string {
    return this.departamento;
  }
  public set _departamento(value: string) {
    this.departamento = value;
  }
}
