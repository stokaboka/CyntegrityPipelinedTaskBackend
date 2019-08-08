import { Test, TestingModule } from '@nestjs/testing';
import { PipeTasksService } from './pipe-tasks.service';

describe('PipeTasksService', () => {
  let service: PipeTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipeTasksService],
    }).compile();

    service = module.get<PipeTasksService>(PipeTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
