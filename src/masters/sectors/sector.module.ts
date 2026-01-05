import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { QmsSectormasters } from './entity/QmsSectormasters';


@Module({
    imports: [TypeOrmModule.forFeature([QmsSectormasters])],
    controllers: [SectorsController],
    providers: [SectorsService],
})
export class SectorModule { }
