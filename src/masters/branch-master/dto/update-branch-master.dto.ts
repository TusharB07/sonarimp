import { PartialType } from '@nestjs/swagger';
import { CreateBranchMasterDto } from './create-branch-master.dto';

export class UpdateBranchMasterDto extends PartialType(CreateBranchMasterDto) {}
