import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MstMenus } from 'src/auth/MstMenus';
import { Repository } from 'typeorm';
import { QmsUsers } from './entity/QmsUsers';
import { QmsUsersRoles } from '../Roles/entity/QmsUsersRoles';
import { QmsPartners } from '../partners/entity/QmsPartners';

@Injectable()

export class UsersService {


    constructor(
      @InjectRepository(MstMenus)
      private readonly menuRepository: Repository<MstMenus>,
      @InjectRepository(QmsUsers)
      private readonly userRepository: Repository<QmsUsers>,
      @InjectRepository(QmsUsersRoles)
      private readonly userRoleRepository: Repository<QmsUsersRoles>,
      @InjectRepository(QmsPartners)
      private readonly partnerRepository: Repository<QmsPartners>,
  
    ) { }
  
  getHello(): { message: string } {
    return {
      message: 'DOW!',
    };
  }

  async getAllUsersPrime(){
    return await this.userRepository.find();
  }

  async getUserById(id: number){
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
