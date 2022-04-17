/* eslint-disable */
import { Module } from '@nestjs/common';
import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';

@Module({
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
})
export class TaskTypeModule {}
