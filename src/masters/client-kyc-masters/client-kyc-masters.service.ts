import { Injectable } from '@nestjs/common';
import { CreateClientKycMasterDto } from './dto/create-client-kyc-master.dto';
import { UpdateClientKycMasterDto } from './dto/update-client-kyc-master.dto';
import { QmsClientkycmasters } from './entities/QmsClientkycmasters';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientKycMastersService {
  
 constructor(
      @InjectRepository(QmsClientkycmasters)
      private readonly QmsClientkycmastersRepository: Repository<QmsClientkycmasters>,
    ) { }


  async getAllClientkycPrime(){
    return await this.QmsClientkycmastersRepository.find();
  }
}
