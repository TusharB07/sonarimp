import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatesService } from './states.service';

@ApiTags('States Controller')
@Controller("states")
export class StatesController {

    constructor(private readonly stateService: StatesService) { }

    @Post('prime')
    async getAllStatesPrimeController(@Req() req: Request, @Res() res: any) {
        try {
            const entities = await this.stateService.getAllStatesPrime();
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
