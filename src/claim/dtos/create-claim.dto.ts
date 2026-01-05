// src/user/dto/create-dow-user.dto.ts

import { IsInt, IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateDowClaimDto {
  // claimId?: number;
  // chassisNo?: string;
  // vehicleRegisterNo?: string;
  // customerId?: string;
  // icId?: number;
  // lossDate?: Date |string;
  // lostTime?: Date |string;
  // intimatedBy?: string;
  // intimatedThrough?: string;
  // claimTypeId?: number;
  // driverName?: string;
  // status?: string;
  // createdby?: string;
  // createddate?: Date|string;
  // updatedby?: string;
  // updateddate?: Date | string;


  //dealerId?: number;
  // accidentState?:string;
  // accidentCity?:string
  // claimantName?:string;
  // claimIntimationToIcDate?:string |Date;
  // vehicleReg?:string;
  // investigatorName?:string;
  // investigatorContact?:string;
  // settlementDate? : Date|string
  // settlementAmount?:string
  // remark?:string




  claimId: number;
  chassisNo: string;
  vehicleRegisterNo: string ;
  customerId: string ;
  icId: number ;
  lossDate: Date|string ;
  lostTime: any;
  intimatedBy: string ;
  intimatedThrough: string ;
  claimTypeId: number ;
  driverName: string ;
  statusId: string ;
  createdBy: string ;
  createdDate: Date|string ;
  updatedBy: string ;
  updatedDate: Date |string;
  dealerId: string ;
  accidentState: string ;
  accidentCity: string ;
  claimantName: string ;
  claimIntimationToIcDate: string ;
  vehicleReg: string ;
  investigatorName: string ;
  investigatorContact: string ;
  settlementDate: string ;
  settlementAmount: string ;
  remark: string ;
  custName:string;
  custContact:string;
  custEmail:string;
  isSendToBroker:number;
  icClaimNumber:string;
  tmibaslClaimNumber:string;
  pincode:number

}
