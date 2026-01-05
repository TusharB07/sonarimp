import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartnerService } from './partners.service';

@ApiTags('Partners Controller')
@Controller("partners")
export class PartnersController {
    constructor(private readonly partnerService: PartnerService) { }

    @Post('prime')
    async getAllPartnersPrime(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.partnerService.getAllUPartnersPrime();
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
