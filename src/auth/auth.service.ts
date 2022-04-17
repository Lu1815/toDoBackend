/* eslint-disable */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService)
    {}

    async signup(dto: AuthDto){
        try {
            // generate the pwd
            const hash = await argon.hash(dto.pwd);
    
            //save the new user
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
        
            //return the saved user
            return this.signToken(user.id, user.email);
        } catch (error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException('Credentials are already created.');
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto){
        //find the user by email
        const user =
        await this.prisma.user.findUnique({
            where: {
              email: dto.email,
            },
        });
        //if user does not exist throw error
        if(!user){
            throw new ForbiddenException(
                'User email does not exist'
            );
        };

        //compare password
        const pwdMatches = await argon.verify(
            user.hash,
            dto.pwd
        )

        //if password incorrect throw exception
        if(!pwdMatches){
            throw new ForbiddenException(
                'Incorrect password'
            );
        }
            
        //send back the user
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
        ): Promise<{ access_token: string }> {
            const payload = {
                sub: userId,
                email,
            };
            const secret = this.config.get('JWT_SECRET');

            const token = await this.jwt.signAsync(
                payload, {
                expiresIn: '15m',
                secret: secret,
            });

        return {
            access_token: token,
        };
    }
}