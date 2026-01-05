import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QmsStatemasters } from './enitity/QmsStatemasters';

@Injectable()
export class StatesService {
    constructor(
        @InjectRepository(QmsStatemasters)
        private readonly stateRepository: Repository<QmsStatemasters>,
    ) {

    }

    async getAllStatesPrime() {
        return await this.stateRepository.find();
    }

}
