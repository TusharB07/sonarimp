
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QmsUsersRoles } from './entity/QmsUsersRoles';

@Injectable()
export class RolesService { 
    constructor(
          @InjectRepository(QmsUsersRoles)
          private readonly userRoleRepository: Repository<QmsUsersRoles>,
    ){}
    getHello(): { message: string } {
        return {
          message: 'DOW!',
        };
      }
    
      async getAllRolesPrime(){
        return await this.userRoleRepository.find();
      }

}
