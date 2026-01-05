import { Injectable } from '@nestjs/common';
import { QmsTerrorismratemasters } from './entity/QmsTerrorismratemasters';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TerrorismratemasterService {
    constructor(
      @InjectRepository(QmsTerrorismratemasters)
          private readonly terrorismratemasterRepository: Repository<TerrorismratemasterService>,
    ){}
    getHello(): { message: string } {
        return {
          message: 'DOW!',
        };
      }
    
      async getAllTerrorismratemasterPrime(){
        return await this.terrorismratemasterRepository.find();
      }
    }
