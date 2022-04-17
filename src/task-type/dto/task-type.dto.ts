/* eslint-disable */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class TaskTypeDto {
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    userEmail?: number;
}