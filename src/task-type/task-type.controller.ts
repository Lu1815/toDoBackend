import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskTypeDto } from './dto';
import { TaskTypeService } from './task-type.service';

@Controller('task-type')
export class TaskTypeController {
  constructor(private ttService: TaskTypeService) {}

  @Get('list')
  getAllTaskTypes() {
    return this.ttService.findTaskTypes();
  }

  @Post('create')
  createTaskType(@Body() dto: TaskTypeDto) {
    return this.ttService.createTaskType(dto);
  }

  @Put('update/:id')
  updateTaskType(@Param('id') idd: string, @Body() { name }: TaskTypeDto) {
    const id = parseInt(idd);
    return this.ttService.updateTaskType({ id, name });
  }

  @Delete('delete/:id')
  deleteTaskType(@Param('id') idd: string) {
    const id = parseInt(idd);
    return this.ttService.deleteTaskType(id);
  }
}
