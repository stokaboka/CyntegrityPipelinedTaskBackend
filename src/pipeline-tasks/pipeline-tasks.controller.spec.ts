/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PipelineTasksController } from './pipeline-tasks.controller';

describe('PipeTasks Controller', () => {
  let controller: PipelineTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipelineTasksController],
    }).compile();

    controller = module.get<PipelineTasksController>(PipelineTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
