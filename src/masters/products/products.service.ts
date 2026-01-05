import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QmsProductmasters } from './entity/QmsProductmasters';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(QmsProductmasters)
        private readonly productRepository: Repository<QmsProductmasters>,
    ) {

    }

    async getAllUProductsPrime() {
        return await this.productRepository.find();
    }

}
