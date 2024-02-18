import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}

  createTask(createTaskDto: CreateTaskDto) {
    return this.repository.create(createTaskDto);
  }

  async findAllTasks() {
    const allTasks = await this.repository.findAll();

    const finishedTasks = allTasks.filter((ts) => ts.isCompleted === true);

    return finishedTasks;
  }

  async findOneTask(id: number) {
    const task = await this.repository.findOne(id);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOneTask(id);
    return this.repository.update(id, updateTaskDto);
  }

  async removeTask(id: number) {
    await this.findOneTask(id);
    return this.repository.remove(id);
  }
}
