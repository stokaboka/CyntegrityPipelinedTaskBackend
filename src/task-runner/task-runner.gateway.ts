/*
 * Copyright (c) 2019. Igor Khorev <igorhorev@gmail.com> http://orangem.me
 */

import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

import { TaskRunnerService } from './task-runner.service';

@WebSocketGateway()
export class TaskRunnerGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  constructor(private readonly taskRunner: TaskRunnerService) {
    // this.taskRunner
    //     .on(TaskRunnerService.PIPELINE_START, this.taskRunnerEventsHandler)
    //     .on(TaskRunnerService.PIPELINE_END, this.taskRunnerEventsHandler)
    //     .on(TaskRunnerService.TASK_START, this.taskRunnerEventsHandler)
    //     .on(TaskRunnerService.TASK_END, this.taskRunnerEventsHandler);
  }

  @WebSocketServer()
  server: Server;

  wsClients = [];
  afterInit() {
    // this.server.emit('testing', { do: 'stuff' });
    // tslint:disable-next-line:no-console
    console.log('afterInit');
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
    // this.server.emit('testing', { do: 'stuff' });
    // tslint:disable-next-line:no-console
    console.log('handleConnection');
  }

  handleDisconnect(client) {
    // tslint:disable-next-line:no-console
    console.log('handleDisconnect');
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }
  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const c of this.wsClients) {
      c.send(event, broadCastMessage);
    }
  }

  // taskRunnerEventsHandler(event: string, data: any): void {
  //   switch (event) {
  //     case TaskRunnerService.PIPELINE_START :
  //       break;
  //     case TaskRunnerService.PIPELINE_END :
  //       break;
  //     case TaskRunnerService.TASK_START :
  //       break;
  //     case TaskRunnerService.TASK_END :
  //       break;
  //   }
  //   // this.server.emit('task-runner', { event, data });
  //   // this.server.emit('testing', { do: 'taskRunnerEventsHandler' });
  // }

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
    // tslint:disable-next-line:no-console
    console.log('events', data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    // tslint:disable-next-line:no-console
    console.log('identity', data);
    return data;
  }

  @SubscribeMessage('message')
  handleMessage(client: any, data: any): string {
    // tslint:disable-next-line:no-console
    console.log('message', data);
    return 'Hello world!';
  }

  @SubscribeMessage('task-runner-status')
  async taskRunnerStatus(client: any, data: any): Promise<any> {
    // tslint:disable-next-line:no-console
    console.log('task-runner-status  *************************');
    // console.log('run-pipeline', data);
    const result = this.taskRunner.getStatus();
    // const out = await this.taskRunner.runTask(data);
    return {
      task: 'task-runner-status',
      result,
    };
  }

  @SubscribeMessage('run-pipeline')
  async runPipeline(client: any, data: any): Promise<any> {
    // tslint:disable-next-line:no-console
    console.log('run-pipeline  *************************');
    // console.log('run-pipeline', data);
    await this.taskRunner.addPipeline(data);
    return {
      task: 'run-pipeline',
      result: 'SCHEDULED',
    };
  }
}
