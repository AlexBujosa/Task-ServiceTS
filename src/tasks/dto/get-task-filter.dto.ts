import { TasksStatus } from "../task.model";
import { IsEnum, IsOptional, IsString } from 'class-validator'
export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(TasksStatus)
    status?: TasksStatus;
    @IsOptional()
    @IsString()
    search?: string;
}