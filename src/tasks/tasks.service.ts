import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
// import { TaskStatus } from './task-status';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    const task = await this.getTaskById(id);
    task.status = status;

    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }
}
