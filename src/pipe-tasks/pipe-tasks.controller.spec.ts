/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Test, TestingModule } from '@nestjs/testing';
import { PipeTasksController } from './pipe-tasks.controller';

describe('PipeTasks Controller', () => {
  let controller: PipeTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipeTasksController],
    }).compile();

    controller = module.get<PipeTasksController>(PipeTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
