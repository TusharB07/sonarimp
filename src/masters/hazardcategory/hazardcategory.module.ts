import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsHazardcategorymasters } from './entity/QmsHazardcategorymasters';
import { HazardCategoryController } from './hazardcategory.controller';
import { HazardCategoryService } from './hazardcategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([QmsHazardcategorymasters])], 
    controllers: [HazardCategoryController], 
    providers: [HazardCategoryService] 
})
export class HazardCategoryModule { }
