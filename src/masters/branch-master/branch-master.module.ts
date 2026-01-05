import { Module } from '@nestjs/common';
import { BranchMasterService } from './branch-master.service';
import { BranchMasterController } from './branch-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QmsBranchmasters } from './entities/QmsBranchmasters';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      QmsBranchmasters
    ]),
  ],
  controllers: [BranchMasterController],
  providers: [BranchMasterService]
})
export class BranchMasterModule {}
