import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products Controller')
@Controller("products")
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Post('prime')
    async getAllProductsPrime(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.productService.getAllUProductsPrime();
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
