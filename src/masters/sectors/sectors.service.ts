import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { QmsSectormasters } from "./entity/QmsSectormasters";


@Injectable()
export class SectorsService {


    constructor(
        @InjectRepository(QmsSectormasters)
        private readonly sectorsRepository: Repository<QmsSectormasters>
    ) {}
    async getAllSectorsPrime() {
        return await this.sectorsRepository.find();
    }
}