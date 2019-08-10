/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TaskRunnerGateway } from './task-runner.gateway';

describe('TaskRunnerGateway', () => {
  let gateway: TaskRunnerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRunnerGateway],
    }).compile();

    gateway = module.get<TaskRunnerGateway>(TaskRunnerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
