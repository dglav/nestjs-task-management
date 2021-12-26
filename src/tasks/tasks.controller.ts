import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
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

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.TasksService.deleteTask(id);
  }
}
