/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

export class PipelinesDto {
  readonly _id: string;
  readonly userId: string;
  readonly name: string;
  readonly user: object;
  readonly runTime: number;
}
