import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuards } from 'src/auth/guard';
import { GetUser } from '../auth/decorator/get-user.decorator';

@UseGuards(JwtGuards)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
