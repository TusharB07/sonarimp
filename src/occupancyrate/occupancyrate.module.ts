import { Module } from '@nestjs/common';
import { OccupancyrateService } from './occupancyrate.service';
import { QmsOccupancies } from './entity/QmsOccupancies'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupancyrateController } from './occupancyrate.controller';

@Module({
    imports:
        [TypeOrmModule.forFeature([
            QmsOccupancies
        ])
        ],
    controllers: [OccupancyrateController],
    providers: [OccupancyrateService],
})
export class OccupancyrateModule { }
