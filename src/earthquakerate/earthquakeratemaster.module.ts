import { TypeOrmModule } from '@nestjs/typeorm';
import { EarthquakeratemasterService } from './earthquakeratemaster.service';
import { Module } from '@nestjs/common';
import { QmsEarthquakeratemasters } from './entity/QmsEarthquakeratemasters';
import { EarthquakeratemasterController } from './earthquakeratemaster.controller';


@Module({
    imports: [TypeOrmModule.forFeature([
        QmsEarthquakeratemasters, 
    ]),],
    controllers: [EarthquakeratemasterController],
    providers: [EarthquakeratemasterService,],
})
export class EarthquakeratemasterModule { }
