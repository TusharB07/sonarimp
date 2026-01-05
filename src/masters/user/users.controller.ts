import { Body, Controller, Get, Next, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { IUserDocument, IUserModel } from 'src/auth/model/userModel';
import { UsersService } from './users.service';
import { ITokenResponseDto } from 'src/interfaces';
import { QmsUsers } from './entity/QmsUsers';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";


@ApiTags('Users Controller')
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('prime')
  async getAllUsersPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
    try {
      const entities = await this.usersService.getAllUsersPrime();
      return res.status(200).json({
        status: 'success',        
        results: entities.length,
        data: {entities}
      });
       
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // @Get("me")
  // async getUser(@Req() req: Request, @Res() res: any, @Body() payload: any) {
  //   const token = req.headers.authorization?.split(" ")[1];
  //   // const decoded = this.jwtService.verify(token);
  //   var id = req.headers;
  //   console.log(id);
  //   const entities =  await this.usersService.getUserById(1);
  //   return res.status(200).json({
  //     status: 'success',        
  //     results: entities,
  //     data: {entities}
  //   });
  // }
}
