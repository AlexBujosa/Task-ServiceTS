import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Task } from './task-status.enum';
import { TasksStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }
    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id);
        if (!found) {
            throw new NotFoundException(`the task with ${id} was not found`);
        }
        return found;
    }
    getTaskWithFilter(getTaskFilterDto: GetTaskFilterDto): Task[] {
        const { status, search } = getTaskFilterDto;
        let task = this.getAllTasks();
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
            }
            )
        }
        return task;

    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TasksStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
    deleteTaskById(id: string): string {
        const deleteMsg = {
            msg200: "The task id " + id + " was deleted",
            msg400: "The task id " + id + " was not deleted"
        }
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != found.id)
        return this.tasks.find(task => task.id === id) === undefined ? deleteMsg.msg200 : deleteMsg.msg400;

    }
    updateTaskStatus(status: TasksStatus, id: string): void {
        var task_U: Task = this.getTaskById(id)
        var index: number = this.tasks.findIndex(task => task === task_U)
        task_U.status = status;
        this.tasks[index] = task_U;
    }
}
