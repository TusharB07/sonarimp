import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QmsEarthquakeratemasters } from './entity/QmsEarthquakeratemasters';
import { Repository } from 'typeorm';

@Injectable()
export class EarthquakeratemasterService {
    constructor(
              @InjectRepository(QmsEarthquakeratemasters)
              private readonly earthquakeratemasterRepository: Repository<QmsEarthquakeratemasters>,
    ) {}
    getHello(): { message: string } {
        return {
          message: 'DOW!',
        };
      }
    
      async getAllEarthquakeratemasterPrime(){
        return await this.earthquakeratemasterRepository.find();
      }
       
}
