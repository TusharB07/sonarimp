import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { QmsStatemasters } from './enitity/QmsStatemasters';
import { QmsCountrymasters } from '../countries/entity/QmsCountrymasters';
import { QmsPartners } from '../partners/entity/QmsPartners';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsStatemasters, QmsCountrymasters , QmsPartners
        ]),
    ],
    providers: [StatesService],
    controllers: [StatesController],
    exports: [StatesService],
})
export class StatesModule { }
