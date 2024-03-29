import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, PrismaService],
})
export class TaskModule {}
