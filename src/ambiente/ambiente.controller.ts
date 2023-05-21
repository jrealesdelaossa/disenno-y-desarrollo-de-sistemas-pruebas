import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AmbienteService } from './ambiente.service';
import { CreatedAmbienteDTO, UpdateAmbienteDTO } from './dto/ambiente.dto';

@Controller('ambiente')
export class AmbienteController {
  constructor(private readonly ambienteService: AmbienteService) { }

  @Get()
  async getAllAmbientes() {
    return this.ambienteService.getAllAmbientes();
  }

  @Get(':id')
  async getByIdAmbiente(@Param('id') idAmbiente: string) {
    const found = await this.ambienteService.getByIdAmbiente(idAmbiente);
    return found;
  }

  @Post('crear')
  async createdAmbiente(@Body() ambienteCreatedDTO: CreatedAmbienteDTO) {
    const newAmbiente = this.ambienteService.createdAmbiente(ambienteCreatedDTO);
    return newAmbiente;
  }

  @Put('editar')
  async updateAmbiente(@Body() updateAmbiente: UpdateAmbienteDTO) {
    const updAmbiente = await this.ambienteService.updateAmbiente(updateAmbiente);
    return updAmbiente;
  }

  @Delete(':id')
  async deleteAmbiente(@Param('id') idAmbiente: string) {
    const delAmbiente = this.ambienteService.deleteAmbiente(idAmbiente);
    return delAmbiente;
  }
}
