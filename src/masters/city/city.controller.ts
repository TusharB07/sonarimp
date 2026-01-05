import { Controller, Post, Req, Res } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('City Controller')
@Controller("cities")
export class CityController {
    constructor(private readonly CityService: CityService) { }

    @Post('prime')
    async getAllCitiesPrimeController(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.CityService.getAllCitiesPrimeService();
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
