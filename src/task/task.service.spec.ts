import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { Task } from '@prisma/client';

describe('TaskService', () => {
  let service: TaskService;
  let repository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<TaskRepository>(TaskRepository);
  });

  describe('createTask', () => {
    it('should return created task', async () => {
      const result: Task = {
        id: 1,
        title: 'Read a book',
        isCompleted: false,
      };
      jest.spyOn(repository, 'create').mockResolvedValue(result);
      expect(await service.createTask(result)).toEqual(result);
    });
  });

  describe('findAllTasks', () => {
    it('should return finished tasks', async () => {
      const allTasks: Task[] = [
        {
          id: 1,
          title: 'Read a book',
          isCompleted: false,
        },
        {
          id: 2,
          title: 'Clean house',
          isCompleted: true,
        },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(allTasks);

      const finishedTasks: Task[] = [
        {
          id: 2,
          title: 'Clean house',
          isCompleted: true,
        },
      ];

      expect(await service.findAllTasks()).toEqual(finishedTasks);
    });
  });

  describe('findOneTask', () => {
    it('should return task', async () => {
      const result: Task = {
        id: 1,
        title: 'Read a book',
        isCompleted: false,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      expect(await service.findOneTask(1)).toEqual(result);
    });
  });

  describe('updateTask', () => {
    it('should return updated task', async () => {
      const result: Task = {
        id: 1,
        title: 'Read a book',
        isCompleted: false,
      };
      jest.spyOn(service, 'findOneTask').mockResolvedValue(result);

      const expectedResult: Task = {
        id: 1,
        title: 'Update Read a book',
        isCompleted: true,
      };
      jest.spyOn(repository, 'update').mockResolvedValue(expectedResult);
      expect(
        await service.updateTask(1, {
          title: 'Update Read a book',
          isCompleted: true,
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('removeTask', () => {
    it('should return deleted task', async () => {
      const result: Task = {
        id: 1,
        title: 'Read a book',
        isCompleted: false,
      };
      jest.spyOn(service, 'findOneTask').mockResolvedValue(result);
      jest.spyOn(repository, 'remove').mockResolvedValue(result);
      expect(await service.removeTask(1)).toEqual(result);
    });
  });
});
