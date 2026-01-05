
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QmsOccupancies } from './entity/QmsOccupancies';
import { Repository } from 'typeorm';

@Injectable()
export class OccupancyrateService { 
     constructor(
                  @InjectRepository(QmsOccupancies)
                  private readonly occupancyrateRepository: Repository<QmsOccupancies>,
        ) {}

        getHello(): { message: string } {
            return {
              message: 'DOW!',
            };
          }
        
          async getAllOccupancyRatePrime(){
            return await this.occupancyrateRepository.find();
          }
}
