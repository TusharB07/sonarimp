import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QmsAddoncovers } from "./entity/QmsAddoncovers";


@Injectable()
export class AddonCoversService {
    
    constructor(
        @InjectRepository(QmsAddoncovers)
        private readonly addonCoversRepository: Repository<QmsAddoncovers>
    ) {}
    async getAllAddonCoversPrime() {
        return await this.addonCoversRepository.find();
    }
}