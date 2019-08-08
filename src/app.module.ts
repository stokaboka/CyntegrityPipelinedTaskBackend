import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { PipesModule } from './pipes/pipes.module';
import { PipeTasksModule } from './pipe-tasks/pipe-tasks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TasksModule, UsersModule, PipesModule, PipeTasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
