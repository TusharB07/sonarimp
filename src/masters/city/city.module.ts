import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsCitymasters } from './entity/QmsCitymasters';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { QmsStatemasters } from '../states/enitity/QmsStatemasters';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsCitymasters, QmsStatemasters]),
    ],
    providers: [CityService],
    controllers: [CityController],
    exports: [CityService],
})
export class CityModule { }
