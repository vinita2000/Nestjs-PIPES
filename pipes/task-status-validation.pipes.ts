import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { taskStatus } from "../tasks.model";


export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        taskStatus.OPEN,
        taskStatus.IN_PROGRESS,
        taskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata){
        value = value.toUpperCase;
        
        if(!this.isStatusValid(status)){
            throw new BadRequestException();
        }

        return value;
    }

    private isStatusValid(status: any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}