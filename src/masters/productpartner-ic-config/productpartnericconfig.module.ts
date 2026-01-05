import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductpartnericconfigService } from './productpartnericconfig.service';
import { Module } from '@nestjs/common';
import { ProductpartnerIcConfigController } from './productpartnericconfig.controller';
import { QmsProductpartnericconfigurations } from './entity/QmsProductpartnericconfigurations';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QmsProductpartnericconfigurations
        ]),
    ],
    controllers: [ProductpartnerIcConfigController],
    providers: [ProductpartnericconfigService],
})
export class ProductpartnericconfigModule { }
