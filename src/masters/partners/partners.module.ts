import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerService } from './partners.service';
import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { QmsPartners } from './entity/QmsPartners';
import { QmsStatemasters } from '../states/enitity/QmsStatemasters';
import { QmsCountrymasters } from '../countries/entity/QmsCountrymasters';
import { QmsCitymasters } from '../city/entity/QmsCitymasters';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsPartners, QmsStatemasters, QmsCountrymasters, QmsCitymasters
        ]),
    ],
    controllers: [PartnersController],
    providers: [PartnerService],
})
export class PartnerModule { }