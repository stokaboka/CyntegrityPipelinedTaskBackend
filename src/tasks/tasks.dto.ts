/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export class TasksDto {
  readonly _id: string;
  readonly userId: string;
  readonly user: object;
  readonly name: string;
  readonly averageTime: number;
}
