import { Controller, Post, Get, UseGuards, Body, Req, Res, Ip, Query , Next } from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { User, Auth } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from './dtos/login.dto';
import { IResponseDto } from 'src/interfaces';
import { Injectable, Logger } from '@nestjs/common';


@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Req() req: any, @Res() res: any, @Next() next: any) {
    await this.authService.login(req, res, next);
  }

  
}
