import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Req, Res } from '@nestjs/common';
import { TerrorismratemasterService } from "./terrorismratemaster.service";
@ApiTags('Terrorismratemaster Controller')
@Controller('terrorism-rate-masters')
export class TerrorismratemasterController {
    constructor(private readonly terrorismratemasterService: TerrorismratemasterService) { }

    @Post('prime')
    async getAllTerrorismratemasterPrime(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.terrorismratemasterService.getAllTerrorismratemasterPrime();
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
