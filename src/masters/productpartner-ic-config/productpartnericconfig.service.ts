import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QmsProductpartnericconfigurations } from './entity/QmsProductpartnericconfigurations';

@Injectable()
export class ProductpartnericconfigService {
    constructor(
        @InjectRepository(QmsProductpartnericconfigurations)
        private readonly productpartnerIcConfigReporsitory: Repository<QmsProductpartnericconfigurations>,
    ) {

    }

    async getAllUPartnersPrime() {
        return await this.productpartnerIcConfigReporsitory.find();
    }
}
