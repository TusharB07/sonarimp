import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NextFunction } from 'express';
import { IUserDocument, IUserModel } from 'src/auth/model/userModel';
import { ITokenResponseDto } from 'src/interfaces';
import { SectorsService } from './sectors.service';

@ApiTags('Sectors Controller')
@Controller("sector-masters")
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) { }

  @Post('prime')
  async getAllUsersPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
    try {
      const entities = await this.sectorsService.getAllSectorsPrime();
      return res.status(200).json({
        status: 'success',        
        results: entities.length,
        data: {entities}
      });
       
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

}
