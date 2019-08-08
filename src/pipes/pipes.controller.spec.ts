import { Test, TestingModule } from '@nestjs/testing';
import { PipesController } from './pipes.controller';

describe('Pipes Controller', () => {
  let controller: PipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipesController],
    }).compile();

    controller = module.get<PipesController>(PipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
