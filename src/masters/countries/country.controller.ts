import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';

@ApiTags('Countries Controller')
@Controller("countries")
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Post('prime')
    async getAllCountryPrimeController(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.countryService.getAllCountriesPrime();
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
