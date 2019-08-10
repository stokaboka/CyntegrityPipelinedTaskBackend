/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

import { TaskRunnerService } from "./task-runner.service";
import {PipelinesService} from "../pipelines/pipelines.service";

@WebSocketGateway()
export class TaskRunnerGateway {

  constructor(private readonly taskRunner: TaskRunnerService){}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
    console.log('events', data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    console.log('identity', data);
    return data;
  }

  @SubscribeMessage('message')
  handleMessage(client: any, data: any): string {
    console.log('message', data);
    return 'Hello world!';
  }

  @SubscribeMessage('run-pipeline')
  async runPipeline(client: any, data: any): Promise<any> {
    console.log('*************************');
    console.log('run-pipeline', data);
    const out = await this.taskRunner.runLS();
    return {
      task:'run-pipeline',
      result: 'OK',
      output: out
    };
  }
}
