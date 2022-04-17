/* eslint-disable */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log({dto})
        return this.authServices.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authServices.signin(dto);
    }
}