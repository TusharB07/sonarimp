import { Injectable } from '@nestjs/common';

import { QmsBranchmasters } from './entities/QmsBranchmasters';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BranchMasterService {
  constructor(
    @InjectRepository(QmsBranchmasters)
    private readonly QmsBranchmastersRepository: Repository<QmsBranchmasters>,
  ) { }


  async getAllQmsBranchmastersPrime(){
    return await this.QmsBranchmastersRepository.find();
  }

}
