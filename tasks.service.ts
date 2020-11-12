import { Injectable, NotFoundException } from '@nestjs/common';
import{ Task, taskStatus } from './tasks.model';
import *  as uuid from 'uuid';
import{ CreateTaskDto } from './dto/create-task-dto';
import { runInNewContext } from 'vm';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }


    createTask(createTaskDto:CreateTaskDto): Task {
        //destructing the ddto
        const{ title, description} = createTaskDto;

        const task: Task = {
            id : '1',
            title,
            description,
            status: taskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskByID(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found){
            throw new NotFoundException();
        }
        return found;

    }

    deleteTask(id: string): void{
        const found = this.getTaskByID(id);
        this.tasks = this.tasks.filter(task => task.id != found.id);
    }

    updateTaskStatus(id: string, status: taskStatus): Task{
        const task = this.getTaskByID(id);
        task.status = status;
        return task;
    }
}


