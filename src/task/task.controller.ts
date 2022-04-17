import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tService: TaskService) {}

  @Get('list')
  getAllTask() {
    return this.tService.findTasks();
  }

  @Post('create')
  createTask(@Body() dto: TaskDto) {
    return this.tService.createTask(dto);
  }

  @Put('update/:id')
  updateTask(@Param('id') id: string, @Body() dto: TaskDto) {
    const idd = parseInt(id);
    return this.tService.updateTask(idd, dto);
  }

  @Delete('delete/:id')
  deleteTaskType(@Param('id') idd: string) {
    const id = parseInt(idd);
    return this.tService.deleteTask(id);
  }
}
