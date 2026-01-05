import { MstMenus } from "src/auth/MstMenus";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { QmsUsers } from "./entity/QmsUsers";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { QmsPartners } from "../partners/entity/QmsPartners";
import { QmsUsersRoles } from "../Roles/entity/QmsUsersRoles";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      MstMenus,QmsUsers,QmsUsersRoles,QmsPartners
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  
})
export class UsersModule { }
