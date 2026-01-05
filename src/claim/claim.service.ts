import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateDowClaimDto } from './dtos/create-claim.dto';
import { DowClaims } from './entities/claim.entity';
import { MstClaimtype } from './entities/claimtype.entiy';
import * as moment from 'moment';
import { MstAccidentStates } from './entities/claimStates.enitiy';
import { MstAccidentCities } from './entities/claimCities.entity';
import { MstPincode } from './entities/claimPincode.entity';
import { MstClaimdocumenttype } from './entities/MstClaimdocumenttype';
import { MailService } from 'src/mailService';

export interface ClaimFindOne {
  id?: number;
  userName?: string;
}


@Injectable()
export class ClaimService {
  constructor(
  ) { }

  // async getMany() {
  //   // return await this.userRepository.find();
  //   try {
  //     return await this.claimRepository
  //       .createQueryBuilder('claims')
  //       .select(['claims'])
  //       .orderBy('claims.updatedDate', 'DESC')
  //       .addOrderBy('claims.updatedDate IS NULL', 'ASC')
  //       .getMany();
  //   } catch (error) {

  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }
  // async GetClaimHistory(chassisNo) {
  //   // return await this.userRepository.find();
  //   try {
  //     return await this.claimRepository
  //       .createQueryBuilder('claims')
  //       .select(['claims'])
  //       .where('claims.chassisNo = :chassisNo', { chassisNo: chassisNo })
  //       .orderBy('claims.updatedDate', 'DESC')
  //       .addOrderBy('claims.updatedDate IS NULL', 'ASC')
  //       .getMany();
  //   } catch (error) {

  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }
  // async getManyForBroker() {
  //   // return await this.userRepository.find();
  //   try {
  //     'claims.'
  //     return await this.claimRepository
  //       .createQueryBuilder('claims')
  //       .select(['claims'])
  //       .where('claims.isSendToBroker = :isSendToBroker', { isSendToBroker: 1 }) // Add the WHERE clause
  //       .orderBy('claims.updatedDate', 'DESC')
  //       .addOrderBy('claims.updatedDate IS NULL', 'ASC')
  //       .getMany();
  //   } catch (error) {

  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }


  // async getManyPolicyupload() {
  //   // return await this.userRepository.find();
  //   try {
  //     return await this.policyUploadRepository
  //       .createQueryBuilder('policyupload')
  //       .select(['policyupload'])
  //       .getMany();
  //   } catch (error) {

  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async getManyPolicyuploadBysearch(chassisNo: string, vcNo: string, custName: string) {
  //   try {
  //     const queryBuilder = this.policyUploadRepository.createQueryBuilder('policyupload')
  //       .select(['policyupload']);

  //     if (chassisNo) {
  //       queryBuilder.andWhere('policyupload.chassisNo = :chassisNo', { chassisNo });
  //     }
  //     if (vcNo) {
  //       queryBuilder.andWhere('policyupload.vcNo = :vcNo', { vcNo });
  //     }
  //     return await queryBuilder.getMany();
  //   } catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async getManyClaimtype() {

  //   try {
  //     return await this.claimtypeRepository
  //       .createQueryBuilder('claimtype')
  //       .select(['claimtype'])
  //       .getMany();
  //   } catch (error) {

  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async GetClaimStatus() {
  //   try {
  //     return await this.statusRepository
  //       .createQueryBuilder("ClaimStatus")
  //       .where({ statusType: 2 })
  //       .getMany();

  //   } catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async GetAccidentStates() {
  //   try {
  //     return await this.accidentStatesRepository
  //       .createQueryBuilder("States")
  //       .getMany();

  //   } catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async GetAccidentCitiesByState(stateId: number) {
  //   try {
  //     return await this.accidentCitiesRepository
  //       .createQueryBuilder("Cities")
  //       .where('Cities.stateId = :stateId'
  //         , { stateId: stateId })
  //       .getMany();

  //   } catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async GetClaimsearchdata(search: any) {
  //   try {
  //     //return await this.claimRepository
  //     const queryBuilder = this.claimRepository.createQueryBuilder('claims')
  //     //.where({ chassisNo: search.chassisNo }, {statusId:search.statusId})
  //     if (search.chassisNo) {
  //       queryBuilder.andWhere('claims.chassisNo = :chassisNo', { chassisNo: search.chassisNo });
  //     }
  //     if (search.statusId) {
  //       queryBuilder.andWhere('claims.statusId = :statusId', { statusId: search.statusId });
  //     }
  //     if (search.claimTypeId) {
  //       queryBuilder.andWhere('claims.claimTypeId = :claimTypeId', { claimTypeId: search.claimTypeId });
  //     }
  //     if (search.fromDate) {
  //       queryBuilder.andWhere('claims.createdDate >= :fromDate', { fromDate: search.fromDate });
  //     }

  //     if (search.toDate) {
  //       queryBuilder.andWhere('claims.createdDate <= :toDate', { toDate: search.toDate });
  //     }

  //     // .getMany();
  //     return await queryBuilder.getMany();
  //   } catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async createOne(dto: CreateDowClaimDto) {

  //   const lastClaim = await this.claimRepository
  //     .createQueryBuilder('claims')
  //     .orderBy('claims.claimId', 'DESC')
  //     .getOne();
  //   const lastId = lastClaim ? lastClaim.claimId : 0; // If no claims exist, start from 0
  //   const newRef = `TMIBASL#-${lastId + 1}`;
  //   dto.tmibaslClaimNumber = newRef;
  //   const newclaim = this.claimRepository.create(dto);
  //   const claim = await this.claimRepository.save(newclaim);
  //   return claim;
  // }

  // async saveAttachmentClaim(attachmentData: any) {
  //   const attachment = this.claimDocumentRepository.create(attachmentData);
  //   return await this.claimDocumentRepository.save(attachment);
  // }


  // async findOne(data: ClaimFindOne) {
  //   return await this.claimRepository
  //     .createQueryBuilder('claim')
  //     .where(data)

  //     .getOne();
  // }


  // // async getUserByToken(data: any) {
  // //   return await this.claimRepository
  // //     .createQueryBuilder('user')
  // //     .where({ sessionId : data })
  // //     .select([
  // //       'user.id',
  // //       'user.name',
  // //     ])
  // //     .getOne();
  // // }

  // async getOne(id: number, claimEntity?: DowClaims) {
  //   const claim = await this.claimRepository
  //     .createQueryBuilder('claim')
  //     .where({ claimId: id })

  //     // .select([
  //     //   'claim.chassisNo'
  //     // ])

  //     .getOne();

  //   // Check if policy document exists
  //   const claimDocument = await this.claimDocumentRepository
  //     .createQueryBuilder('document')
  //     .where('document.claimId = :id', { id })
  //     .andWhere('document.statusId != 16', { id })
  //     .getMany();

  //   if (!claim)
  //     throw new BadRequestException(
  //       ' Claim Does Not Exists Or Unauthorized',
  //     );

  //   return { claim, claimDocument };
  // } catch(error) {
  //   throw new BadRequestException(`${error.message}`);
  // }

  // async editOne(id: number, dto: CreateDowClaimDto) {
  //   // console.log(dto);
  //   dto.createdDate = moment().format('YYYY-MM-DD');
  //   dto.updatedDate = moment().format('YYYY-MM-DD')
  //   const userExist = await this.claimRepository.findOne({ claimId: dto.claimId });
  //   return await this.claimRepository.update(userExist, dto);
  // }


  // async editDocument(dto: any) {
  //   const claimDoc = await this.claimDocumentRepository.findOne({ claimDocumentId: dto.claimDocumentId });
  //   if (dto.statusId == 15) {
  //     await this.mailService.sendUserConfirmation("uddhav@astekbit.com");
  //   }
  //   await this.claimDocumentRepository.update(claimDoc, dto);

  // }

  // async getOnePolicyUploadData(id: number) {
  //   const user = await this.policyUploadRepository
  //     .findOne(id);

  //   if (!user) { throw new NotFoundException('User Does Not Exists Or Unauthorized'); }


  //   return user;
  // }

  // async getOnePolicyData(id: number) {
  //   const policy = await this.policyRepository
  //     .findOne(id);

  //   if (!policy) { throw new NotFoundException('User Does Not Exists Or Unauthorized'); }


  //   return policy;
  // }


  // async getOneDelearById(id: any) {
  //   const deler = await this.delearRepository
  //     .findOne(id);
  //   return deler;
  // }
  // async getOneDelearByCode(dealerCode: string) {
  //   const delear = await this.delearRepository.findOne({
  //     where: { dealerCode: dealerCode }
  //   });
  //   return delear;
  // }


  // async getAllDelear() {
  //   const delear = await this.delearRepository.find();
  //   return delear;
  // }

  // async getOneICById(id: any) {
  //   const ic = await this.icRepository
  //     .findOne(id);
  //   return ic;
  // }

  // async getClaimDocumentType() {
  //   const claimDocType = await this.claimDocumentTypeRepository.find();
  //   return claimDocType;
  // }

  // async getClaimDocumentStatus() {
  //   const claimDocumentStatus = await this.statusRepository.find({
  //     where: { statusType: 4 }
  //   });
  //   return claimDocumentStatus;
  // }

  // /////////////////////////////////////////////////------------------DEALER-----------------------------/////////////////////////////////

  // async createOneclaimdealer(dto: CreateDowClaimDto) {
  //   //   const userExist = await this.claimRepository.findOne({ username: dto.username });
  //   //   if (userExist) throw new BadRequestException('User Name Already Exists !!');


  //   const newclaim = this.claimRepository.create(dto);
  //   const claim = await this.claimRepository.save(newclaim);

  //   //   delete user.password;
  //   return claim;
  // }


  // async findOneclaimdealer(data: ClaimFindOne) {
  //   return await this.claimRepository
  //     .createQueryBuilder('claim')
  //     .where(data)

  //     .getOne();
  // }

  // async getOneclaimdealer(id: number, claimEntity?: DowClaims) {
  //   try {
  //     const claim = await this.claimRepository
  //       .createQueryBuilder('claim')
  //       .where({ claimId: id })

  //       // .select([
  //       //   'claim.chassisNo'
  //       // ])

  //       .getOne();
  //     if (!claim)
  //       throw new BadRequestException(
  //         ' Claim Does Not Exists Or Unauthorized',
  //       );

  //     return claim;

  //   }
  //   catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }

  // async editOneclaimdealer(id: number, dto: CreateDowClaimDto) {
  //   // console.log(dto);
  //   dto.createdDate = moment().format('YYYY-MM-DD');
  //   dto.updatedDate = moment().format('YYYY-MM-DD')
  //   const userExist = await this.claimRepository.findOne({ claimId: dto.claimId });
  //   return await this.claimRepository.update(userExist, dto);
  // }

  // async getPincode(id: number) {
  //   try {
  //     return await this.claimpincodeRepository
  //       .createQueryBuilder('pincode')
  //       .where({ cityId: id })
  //       .getMany();
  //     // if (!pincode)
  //     //   throw new BadRequestException(
  //     //     ' Pncode Does Not Exists ',
  //     //   );

  //     //return { pincode };
  //   }
  //   catch (error) {
  //     throw new BadRequestException(`${error.message}`);
  //   }
  // }
}
