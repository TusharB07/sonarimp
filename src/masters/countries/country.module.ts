import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsCountrymasters } from './entity/QmsCountrymasters';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsCountrymasters
        ]),
    ],
    providers: [CountryService],
    controllers: [CountryController],
    exports: [CountryService],
})
export class CountryModule { }
