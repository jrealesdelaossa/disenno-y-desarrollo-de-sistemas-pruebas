import { Test, TestingModule } from '@nestjs/testing';
import { GestorDisponibilidadnestService } from './gestor-disponibilidadnest.service';

describe('GestorDisponibilidadnestService', () => {
  let service: GestorDisponibilidadnestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestorDisponibilidadnestService],
    }).compile();

    service = module.get<GestorDisponibilidadnestService>(
      GestorDisponibilidadnestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
