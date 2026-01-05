import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Req, Res } from '@nestjs/common';
import { OccupancyrateService } from './occupancyrate.service';

@ApiTags ('OccupancyRate Controller')
@Controller('occupancy')
export class OccupancyrateController {
    constructor(private readonly occupancyrateServices: OccupancyrateService) { }
        
          @Post('prime')
          async getAllOccupancyRatePrime(@Req() req: Request, @Res() res: any) {
            try {
              const entities = await this.occupancyrateServices.getAllOccupancyRatePrime();
              return res.status(200).json({
                status: 'success',
                results: entities.length,
                data: { entities }
              });
        
            } catch (error) {
              return res.status(500).json({ message: 'Internal server error', error });
            }
          }
}
