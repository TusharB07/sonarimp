import { Controller, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";

@ApiTags('Roles Controller')
@Controller('role')
export class RolesCOntroller {
  constructor(private readonly rolesService: RolesService) { }

  @Post('prime')
  async getAllRolesPrime(@Req() req: Request, @Res() res: any) {
    try {
      const entities = await this.rolesService.getAllRolesPrime();
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