import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HazardCategoryService } from './hazardcategory.service';

@ApiTags('HazardCategory Controller')
@Controller("hazard-categories")
export class HazardCategoryController {
  constructor(private readonly HazardCategoryService: HazardCategoryService) { }

  @Post('prime')
  async getAllHazardCategoryPrime(@Req() req: Request, @Res() res: any, @Body() payload: any) {
    try {
      const entities = await this.HazardCategoryService.getAllHazardCategoryPrime();
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
