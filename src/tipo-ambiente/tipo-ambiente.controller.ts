import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TipoAmbienteService } from './tipo-ambiente.service';
import { CreatedTipoAmbienteDTO, UpdateTipoAmbienteDTO } from './dto/tipo-ambiente.dto';

@Controller('tipo-ambiente')
export class TipoAmbienteController {

    constructor(private readonly tipoAmbientService: TipoAmbienteService) { }

    @Get()
    async getAllTiposAmb() {
        return await this.tipoAmbientService.getAllTipos();
    }

    @Get(':id')
    async getByIdTiposAmb(@Param('id') idTipoAmbiente: string) {
        const found = this.tipoAmbientService.getByIdTipos(idTipoAmbiente);
        return found;
    }

    @Post('crear')
    async crearTipoAmb(@Body() crearTipoAmb: CreatedTipoAmbienteDTO) {
        const newTipoAmb = await this.tipoAmbientService.createdTipoAmb(crearTipoAmb);
        return newTipoAmb;
    }

    @Patch('actualizar/:id')
    async actualizarTipoAmb(@Param('id') idTipoAmb: string, @Body() updateTipeAmb: UpdateTipoAmbienteDTO) {
        const updateTipo = await this.tipoAmbientService.updateTipoAmb(idTipoAmb, updateTipeAmb);
        return updateTipo;
    }

    @Delete('eliminar/:id')
    async deleteTipoAmb(@Param('id') idTipoAmb: string) {
        const deleted = await this.tipoAmbientService.deleteTipoAmb(idTipoAmb);
        return deleted;
    }
}