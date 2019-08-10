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
    taskRunner.setGateway(this);
  }

  @WebSocketServer()
  server: Server;

  wsClients = [];
  afterInit() {
    this.server.emit('testing', { do: 'init' });
  }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});
  }
  broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    this.server.emit('testing', { do: 'stuff' });
    for (const c of this.wsClients) {
      c.send(event, broadCastMessage);
    }
  }

  emit(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
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
    return 'Hello world!';
  }

  @SubscribeMessage('task-runner-status')
  async taskRunnerStatus(client: any, data: any): Promise<any> {
    const result = this.taskRunner.getStatus('Task Runner status');
    return {
      task: 'task-runner-status',
      result,
    };
  }

  @SubscribeMessage('run-pipeline')
  async runPipeline(client: any, data: any): Promise<any> {
    await this.taskRunner.addPipeline(data);
    return {
      task: 'run-pipeline',
      result: 'SCHEDULED',
    };
  }
}
