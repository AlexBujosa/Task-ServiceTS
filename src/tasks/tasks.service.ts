import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) { }
    async getAllTask(): Promise<Task[]> {
        const getAllTasks = await this.tasksRepository.find();
        return getAllTasks;
    }
    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!found) {
            throw new NotFoundException(`the task with ${id} was not found`);
        }
        return found;
    }
    async getTaskWithFilter(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = getTaskFilterDto;
        let task = await this.getAllTask();
        // Filter By Status
        if (status) {
            task = task.filter(task => task.status === status)
        }
        // Filter By Description and Id
        if (search) {
            task = task.filter(task => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const Task = this.tasksRepository.create({
            title: title,
            description: description,
            status: TasksStatus.OPEN
        })
        let response = await this.tasksRepository.save(Task);

        return response;
    }
    async deleteTaskById(id: string): Promise<string> {
        const deleteMsg = {
            msg200: "The task id " + id + " was deleted",
            msg400: "The task id " + id + " was not deleted"
        }
        const deleteTask = await this.tasksRepository.delete({
            id: id
        })
        if (!deleteTask) {
            return deleteMsg.msg400;
        }
        return deleteMsg.msg200;

    }
    async updateTaskStatus(status: TasksStatus, id: string): Promise<Task> {
        const task = await this.getTaskById(id)
        console.log(status);
        if (
            TasksStatus.OPEN != status &&
            TasksStatus.IN_PROCESS != status &&
            TasksStatus.DONE != status
        ) throw new Error("Invalid Status");
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
