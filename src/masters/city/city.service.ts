import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QmsCitymasters } from './entity/QmsCitymasters';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(QmsCitymasters)
        private readonly cityRepository: Repository<QmsCitymasters>,
    ) {

    }

    async getAllCitiesPrimeService() {
        return await this.cityRepository.find();
    }
}
