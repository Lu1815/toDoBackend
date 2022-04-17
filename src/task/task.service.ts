/* eslint-disable */
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
      private prisma: PrismaService,
      private config: ConfigService
    ){}

    async createTask(dto: TaskDto) {
        try{
            //save new tasktype
            const task = await this.prisma.task.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                },
            });

            //return the saved tasktype
            return task;

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException('Task already created.');
                }
            }
            throw error;
        }
    }

    async findTasks() {
        //find all taskTypes
        const task = await this.prisma.task.findMany()

        //return all the taskTypes
        return task;
    }

    async updateTask(id: number, dto: TaskDto) {
        //update the taskType
        const task = await this.prisma.task.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                description: dto.description
            },
        });

        //return the updated taskType
        return task;
    }

    async deleteTask(id: number) {
        //delete the taskType
        const task = await this.prisma.task.delete({
            where: {
                id: id,
            },
        });
    }
}