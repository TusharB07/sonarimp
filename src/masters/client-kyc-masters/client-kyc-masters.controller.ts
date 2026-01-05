import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { ClientKycMastersService } from './client-kyc-masters.service';
import { CreateClientKycMasterDto } from './dto/create-client-kyc-master.dto';
import { UpdateClientKycMasterDto } from './dto/update-client-kyc-master.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Client Kyc Masters Controller')
@Controller('client-kyc-masters')
export class ClientKycMastersController {
  constructor(private readonly clientKycMastersService: ClientKycMastersService) {}

  

  @Post('prime')
    async getAllUsersPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
      try {
        const entities = await this.clientKycMastersService.getAllClientkycPrime();
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
