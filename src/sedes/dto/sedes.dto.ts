import { IsNotEmpty, Matches } from "class-validator";


export class Sede_Dto {
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Nombre no puede ser estar vacío' })
    private nombre: string;

    @Matches(/^(?!\s*$).+/, { message: 'El centro no puede ser estar vacío' })
    @IsNotEmpty()
    private centro: string;

    @Matches(/^(?!\s*$).+/, { message: 'El lugar de funcionamiento no puede ser estar vacío' })
    @IsNotEmpty()
    private lugar_funcionamiento: string;

    @Matches(/^(?!\s*$).+/, { message: 'El departamento no puede ser estar vacío' })
    @IsNotEmpty()
    private departamento: string;

    @Matches(/^(?!\s*$).+/, { message: 'El municipio no puede ser estar vacío' })
    @IsNotEmpty()
    private municipio: string;

    public get _id(): string {
        return this._id;
    }
    public get _centro(): string {
        return this.centro;
    }
    public set _centro(value: string) {
        this.centro = value;
    }

    public get _nombre(): string {
        return this.nombre;
    }
    public set _nombre(value: string) {
        this.nombre = value;
    }

    public get _lugar_funcionamiento(): string {
        return this.lugar_funcionamiento;
    }
    public set _lugar_funcionamiento(value: string) {
        this.lugar_funcionamiento = value;
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