/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export class PipelineTasksDto {
  readonly _id: string;
  readonly userId: string;
  readonly pipelineId: string;
  readonly taskId: string;
  readonly user: object;
  readonly pipeline: object;
  readonly task: object;
}
