/* eslint-disable */
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { TaskTypeDto } from './dto/task-type.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class TaskTypeService {
  constructor(
      private prisma: PrismaService,
      private config: ConfigService
    ){}

    async createTaskType(dto: TaskTypeDto) {
        try{
            //save new tasktype
            const taskType = await this.prisma.taskType.create({
                data: {
                    name: dto.name,
                },
            });

            //return the saved tasktype
            return taskType;

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException('Task type already created.');
                }
            }
            throw error;
        }
    }

    async findTaskTypes() {
        //find all taskTypes
        const taskTypes = await this.prisma.taskType.findMany()

        //return all the taskTypes
        return taskTypes;
    }

    async updateTaskType({id, name}: TaskTypeDto) {
        //update the taskType
        const taskType = await this.prisma.taskType.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        });

        //return the updated taskType
        return taskType;
    }

    async deleteTaskType(id: number) {
        //delete the taskType
        const taskType = await this.prisma.taskType.delete({
            where: {
                id: id,
            },
        });
    }
}