import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Req, Res } from '@nestjs/common';
import { EarthquakeratemasterService } from "./earthquakeratemaster.service";

@ApiTags ('EarthquakeRate Controller')

@Controller('earthquake-rate-masters')
export class EarthquakeratemasterController {
      constructor(private readonly earthquakeratemasterServices: EarthquakeratemasterService) { }
    
      @Post('prime')
      async getAllEarthquakeratemasterPrime(@Req() req: Request, @Res() res: any) {
        try {
          const entities = await this.earthquakeratemasterServices.getAllEarthquakeratemasterPrime();
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
