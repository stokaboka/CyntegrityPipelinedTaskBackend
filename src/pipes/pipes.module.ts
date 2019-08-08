import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipesService } from './pipes.service';
import { PipesController } from './pipes.controller';
import { PipesSchema } from './pipes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Pipes', schema: PipesSchema },
    ]),
  ],
  providers: [PipesService],
  controllers: [PipesController]
})
export class PipesModule {}
