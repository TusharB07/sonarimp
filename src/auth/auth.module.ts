import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JWT_COOKIE_EXPIRES, JWT_SECRET } from '../config/constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaptchaController } from './captcha.controller';
import { CaptchaService } from './captcha.service';
import { MstMenus } from './MstMenus';
import { QmsPartners } from 'src/masters/partners/entity/QmsPartners';
import { QmsUsersRoles } from 'src/masters/Roles/entity/QmsUsersRoles';
import { QmsUsers } from 'src/masters/user/entity/QmsUsers';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      MstMenus,QmsUsers,QmsUsersRoles,QmsPartners
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: config.get<string>(JWT_COOKIE_EXPIRES) },
      }),
    }),
  ],

  controllers: [AuthController, CaptchaController],
  providers: [AuthService, CaptchaService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
