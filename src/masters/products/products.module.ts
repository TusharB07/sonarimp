import { ProductsService } from './products.service';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsProductmasters } from './entity/QmsProductmasters';
import { ProductsController } from './products.controller';
import { QmsPartners } from '../partners/entity/QmsPartners';
import { QmsStatemasters } from '../states/enitity/QmsStatemasters';
import { QmsCountrymasters } from '../countries/entity/QmsCountrymasters';
import { QmsCitymasters } from '../city/entity/QmsCitymasters';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsPartners, QmsStatemasters, QmsCountrymasters, QmsCitymasters, QmsProductmasters
        ]),
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService],
})
export class ProductsModule { }
