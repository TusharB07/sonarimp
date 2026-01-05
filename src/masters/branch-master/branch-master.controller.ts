import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { BranchMasterService } from './branch-master.service';
import { CreateBranchMasterDto } from './dto/create-branch-master.dto';
import { UpdateBranchMasterDto } from './dto/update-branch-master.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Branch Master Controller')
@Controller('BranchMaster')
export class BranchMasterController {
  constructor(private readonly branchMasterService: BranchMasterService) {}

    @Get()
    async getAllUsersPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
      try {
        const entities = await this.branchMasterService.getAllQmsBranchmastersPrime();
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
