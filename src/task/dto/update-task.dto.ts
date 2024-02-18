import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({ description: 'Completed status', example: true })
  isCompleted: boolean;
}
