import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddonCoversService} from './addoncovers.service';


@ApiTags('AddonCovers Controller')
@Controller("addon-covers")
export class AddonCoversController {
  constructor(private readonly AddonCoversService: AddonCoversService) { }

  @Post('prime')
  async getAllAddonCoversPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
    try {
      const entities = await this.AddonCoversService.getAllAddonCoversPrime();
      return res.status(200).json({
        status: 'success',        
        results: entities,
        data: {entities}
      });
       
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

}
