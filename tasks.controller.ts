import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, taskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task{

        return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskByID(@Param() id:string){
        return this.tasksService.getTaskByID(id);
    }

    @Delete('/:id')
    deleteTask(@Param() id:string): void{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param() id:string, 
    @Body('status', TaskStatusValidationPipe) status: taskStatus){
        return this.tasksService.updateTaskStatus(id, status);
    }
}
