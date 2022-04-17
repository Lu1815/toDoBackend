/* eslint-disable */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class TaskDto {
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}