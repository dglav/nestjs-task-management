import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
// import { TaskStatus } from './task-status';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne(id, { where: { user } });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    const task = await this.getTaskById(id, user);
    task.status = status;

    return this.taskRepository.save(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }
}
