import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsAddoncovers } from './entity/QmsAddoncovers';
import { AddonCoversService } from './addoncovers.service';
import { AddonCoversController } from './addoncovers.controller';


@Module({
    imports: [TypeOrmModule.forFeature([QmsAddoncovers])], 
    controllers: [AddonCoversController], 
    providers: [AddonCoversService] 
})
export class AddonCoversModule { }
