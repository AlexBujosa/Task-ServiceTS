import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';
import { TasksStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @Get()
    getTasks(@Query() getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        console.log('xd');
        if (Object.keys(getTaskFilterDto).length) {
            return this.tasksService.getTaskWithFilter(getTaskFilterDto);
        } else {
            return this.tasksService.getAllTask();
        }
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Promise<string> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Body() updadateTaskStatusDto: UpdateTaskStatusDto,
        @Param('id') id: string
    ): Promise<Task> {
        const { status } = updadateTaskStatusDto;
        return this.tasksService.updateTaskStatus(status, id);
    }
}
