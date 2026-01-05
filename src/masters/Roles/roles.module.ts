import { MstMenus } from 'src/auth/MstMenus';
import { RolesCOntroller } from './roles.controller';
import { RolesService } from './roles.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsUsersRoles } from './entity/QmsUsersRoles';
import { QmsUsers } from '../user/entity/QmsUsers';
import { QmsPartners } from '../partners/entity/QmsPartners';


@Module({
    imports: [
      TypeOrmModule.forFeature([
            MstMenus,QmsUsers,QmsUsersRoles,QmsPartners
          ]),
    ],
    controllers: [RolesCOntroller],
    providers: [ RolesService, ],
})
export class RolesModule {}
