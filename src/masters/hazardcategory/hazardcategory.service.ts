import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QmsHazardcategorymasters } from "./entity/QmsHazardcategorymasters";


@Injectable()
export class HazardCategoryService {
    
    constructor(
        @InjectRepository(QmsHazardcategorymasters)
        private readonly hazardCategoryRepository: Repository<QmsHazardcategorymasters>
    ) {}
    async getAllHazardCategoryPrime() {
        return await this.hazardCategoryRepository.find();
    }
}