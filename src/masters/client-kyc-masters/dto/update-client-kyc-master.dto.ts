import { PartialType } from '@nestjs/mapped-types';
import { CreateClientKycMasterDto } from './create-client-kyc-master.dto';

export class UpdateClientKycMasterDto extends PartialType(CreateClientKycMasterDto) {}
