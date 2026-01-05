import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsTerrorismratemasters } from './entity/QmsTerrorismratemasters';
import { TerrorismratemasterController } from './terrorismratemaster.controller';
import { TerrorismratemasterService } from './terrorismratemaster.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        QmsTerrorismratemasters
              ]),],
    controllers: [TerrorismratemasterController],
    providers: [TerrorismratemasterService],
})
export class TerrorismrateModule {}