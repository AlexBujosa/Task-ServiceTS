import { TasksStatus } from "../task.model";
import { IsEnum } from 'class-validator'
export class UpdateTaskStatusDto {
    @IsEnum(TasksStatus)
    status: TasksStatus
}