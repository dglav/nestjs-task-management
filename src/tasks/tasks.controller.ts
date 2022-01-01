import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from './task.model';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.TasksService.getFilteredTasks(filterDto);
    }

    return this.TasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.TasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.TasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    console.log(updateTaskStatusDto);
    return this.TasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.TasksService.deleteTask(id);
  }
}
