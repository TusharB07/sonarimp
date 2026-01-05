import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QmsPartners } from './entity/QmsPartners';

@Injectable()
export class PartnerService {

    constructor(
        @InjectRepository(QmsPartners)
        private readonly partnerRepository: Repository<QmsPartners>,
    ) {

    }

    async getAllUPartnersPrime() {
        return await this.partnerRepository.find();
    }
}
