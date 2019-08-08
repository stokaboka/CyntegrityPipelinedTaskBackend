/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
