/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PipelineTasksService } from './pipeline-tasks.service';

describe('PipeTasksService', () => {
  let service: PipelineTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipelineTasksService],
    }).compile();

    service = module.get<PipelineTasksService>(PipelineTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
