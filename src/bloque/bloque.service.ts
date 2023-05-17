import { Injectable } from '@nestjs/common';

@Injectable()
export class BloqueService {
  async findAllBlock() {
    return 'This action returns all block';
  }

  async createBlock() {
    return 'This action adds a new block';
  }
}
