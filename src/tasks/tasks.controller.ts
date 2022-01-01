import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
// import { Task } from './task-status';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { CreateTaskDto } from './dto/create-task-dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.TasksService.getFilteredTasks(filterDto);
  //   }
  //   return this.TasksService.getAllTasks();
  // }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
