import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QmsCountrymasters } from './entity/QmsCountrymasters';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(QmsCountrymasters)
        private readonly countryRepository: Repository<QmsCountrymasters>,
    ) {

    }

    async getAllCountriesPrime() {
        return await this.countryRepository.find();
    }
}
