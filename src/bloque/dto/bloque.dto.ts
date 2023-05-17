import { IsNotEmpty, IsString } from 'class-validator';

export class Bloque_Dto {
  @IsNotEmpty()
  @IsString()
  private nombre: string;

  @IsNotEmpty()
  @IsString()
  private nomenclatura: string;

  public get _nombre(): string {
    return this.nombre;
  }
  public set _nombre(value: string) {
    this.nombre = value;
  }

  public get _nomenclatura(): string {
    return this.nomenclatura;
  }
  public set _nomenclatura(value: string) {
    this.nomenclatura = value;
  }
}
