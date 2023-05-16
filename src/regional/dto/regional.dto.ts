import { IsNotEmpty, Length, IsOptional, IsString } from 'class-validator';
export class Regional_Dto {
  @IsNotEmpty()
  @IsOptional()
  private id: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  private codigo: string;

  @IsNotEmpty()
  @IsString()
  private nombre: string;

  @IsNotEmpty()
  @IsString()
  private departamento: string;

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
