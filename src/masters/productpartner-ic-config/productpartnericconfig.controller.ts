import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductpartnericconfigService } from './productpartnericconfig.service';

@ApiTags('ProductpartnerIcConfig Controller')
@Controller("product-partner-ic-configuration")
export class ProductpartnerIcConfigController {
    constructor(private readonly partproductpartnerIcConfigService: ProductpartnericconfigService) { }

    @Post('prime')
    async getAllProductPartnerIcConfigPrime(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.partproductpartnerIcConfigService.getAllUPartnersPrime();
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
