import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Task } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @Get()
    getTasks(@Query() getTaskFilterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(getTaskFilterDto).length) {
            return this.tasksService.getTaskWithFilter(getTaskFilterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): string {
        return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Body('status') updateTaskStatusDto: UpdateTaskStatusDto, @Param('id') id: string) {
        const { status } = updateTaskStatusDto;
        this.tasksService.updateTaskStatus(status, id);
    }
}
