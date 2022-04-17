/* eslint-disable */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskTypeController } from './task-type/task-type.controller';
import { TaskTypeModule } from './task-type/task-type.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AuthModule,
    UserModule,
    PrismaModule,
    TaskTypeModule,
    TaskModule,
  ],
})
export class AppModule {}
