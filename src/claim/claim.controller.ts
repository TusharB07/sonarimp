import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';

import { IResponseDto } from 'src/interfaces';
import { ClaimService } from './claim.service';
import { CreateDowClaimDto } from './dtos/create-claim.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { async } from 'rxjs';
import { ClaimDocument } from './dtos/claimDocument.dto';


@ApiTags('Claimroutes')
@Controller('claim')
// @Auth()
export class ClaimController {
  constructor(
    private readonly claimService: ClaimService,

  ) { }

  // @Get()
  // async getMany() {
  //   const data = await this.claimService.getMany();
  //   const claimstatus = await this.claimService.GetClaimStatus();
  //   const claimtype = await this.claimService.getManyClaimtype();
  //   return { data, claimstatus, claimtype };
  // }

  // // async GetClaimHistory() 
  // // {
  // //   const claimData = await this.claimService.GetClaimHistory();
  // //   return claimData
  // // }
  // @Get("GetClaimHistory/:chassisNo")
  // async GetClaimHistory(@Req() req, @Res() res, @Param('chassisNo') chassisNo: number) {
  //   const data = await this.claimService.GetClaimHistory(chassisNo);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Get One Successfully',
  //     data: data
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Get("getclaimDocType")
  // async getclaimDocType() {
  //   const claimDocType = await this.claimService.getClaimDocumentType()
  //   return { claimDocType };
  // }

  // @Get("getForBroker")
  // async getManyForBroker() {
  //   const data = await this.claimService.getManyForBroker();
  //   const claimstatus = await this.claimService.GetClaimStatus();
  //   const delear = await this.claimService.getAllDelear();
  //   const claimtype = await this.claimService.getManyClaimtype();
  //   return { data, claimstatus, delear, claimtype };
  // }

  // @Get("getpolicyupload")
  // async getManyPolicyupload() {
  //   const data = await this.claimService.getManyPolicyupload();
  //   return { data };
  // }

  // @Get('getpolicyuploadBySearch')
  // async getPolicyUpload(
  //   @Query('param1') chassisNo: string,
  //   @Query('param2') vcNo: string,
  //   @Query('param3') custName: string,
  // ) {

  //   console.log('Received parameters:', chassisNo, vcNo, custName);
  //   const data = await this.claimService.getManyPolicyuploadBysearch(chassisNo, vcNo, custName);
  //   return { data };
  // }

  // @Get("getclaimtype")
  // async getManyClaimtype() {
  //   const data = await this.claimService.getManyClaimtype();
  //   return { data };
  // }

  // @Get("claimstatus")
  // async getManuserstatus() {
  //   const data = await this.claimService.GetClaimStatus();
  //   return { data };
  // }

  // @Get("accidentStates")
  // async getAccidentStates() {
  //   const data = await this.claimService.GetAccidentStates();
  //   return { data };
  // }

  // @Get('accidentCities/:stateId')
  // async getAccidentCitiesByState(@Req() req, @Res() res, @Param('stateId') stateId: number) {
  //   const data = await this.claimService.GetAccidentCitiesByState(stateId);
  //   res.status(200).json(data);
  //   // return { data };
  // }

  // @Get('pincode/:cityId')
  // async getPincode(@Req() req, @Res() res, @Param('cityId') cityId: number) {
  //   const data = await this.claimService.getPincode(+cityId);
  //   res.status(200).json(data);
  // }

  // @Post('GetClaimsearchdata')
  // async GetClaimsearchdata(@Req() req, @Res() res, @Body() CreateDowClaimDto: any) {
  //   const data = await this.claimService.GetClaimsearchdata(CreateDowClaimDto);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Get One Successfully',
  //     data: data
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Post()
  // @UseInterceptors(FilesInterceptor('files', 100, { // Adjust the number based on your needs
  //   storage: diskStorage({
  //     destination: './claimUploads',
  //     filename: (req, file, cb) => {
  //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  //       cb(null, `${randomName}${extname(file.originalname)}`);
  //     }
  //   })
  // }))
  // async createOne(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
  //   const { claim } = body;
  //   const claimData = JSON.parse(claim);
  //   var doc = claimData.ClaimAttachments;
  //   delete claimData.ClaimAttachments;
  //   const newDto = Object.assign(claimData);
  //   const data = await this.claimService.createOne(newDto);
  //   if (files && files.length > 0) {
  //     newDto.policyAttachments = [];
  //     files.forEach((file, index) => {
  //       const attachmentData: ClaimDocument = {
  //         claimId: data.claimId,
  //         documentName: file.originalname,
  //         uniqeDocumentName: file.filename,
  //         documentTypeId: doc[index]?.documentTypeId,
  //         uplodedBy: newDto.uploadedBy || 'Unknown',
  //         uplodedDate: new Date(),
  //         claimDocumentId: 0,
  //         description: doc[index]?.description,
  //         statusId: doc[index]?.statusId || 0
  //       };
  //       this.claimService.saveAttachmentClaim(attachmentData);
  //       //newDto.policyAttachments.push(attachmentData);
  //     });
  //   }
  //   //const doc = await this.claimService.createOne(newDto);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Claim Created Successfully',
  //     // data:data
  //   };
  //   // res.status(200).json(respDto);  
  //   return { message: 'Claim created', data };
  // }

  // @Get(':id')
  // async getOne(@Req() req, @Res() res, @Param('id') id: number) {
  //   const claim = await this.claimService.getOne(id);
  //   const ic = await this.claimService.getOneICById(claim.claim.icId);
  //   const delear = await this.claimService.getOneDelearById(claim.claim.dealerId);
  //   const claimDocType = await this.claimService.getClaimDocumentType()
  //   const claimStatusType = await this.claimService.getClaimDocumentStatus()
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Get One Successfully',
  //     data: { claim, ic, delear, claimDocType, claimStatusType }
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Put(':id')
  // async editOne(
  //   @Res() res,
  //   @Param('id') id: number,
  //   @Body() dto: any,

  // ) {
  //   let data;
  //   const newDto = Object.assign(dto, CreateDowClaimDto);
  //   delete newDto.ClaimAttachments;
  //   data = await this.claimService.editOne(id, newDto);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Claim Edited Successfully',
  //     // data:data
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Post("createclaimdealer")
  // async createOneClaimdealer(@Req() req, @Res() res, @Body() dto: any) {
  //   // const defaultValue = createDefaultValue(req.user);
  //   const newDto = Object.assign(dto);
  //   // console.log(dto);
  //   const data = await this.claimService.createOneclaimdealer(newDto);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Claim Created Successfully',
  //     // data:data
  //   };
  //   res.status(200).json(respDto);
  //   // return { message: 'User created', data };
  // }

  // @Post("documentAcceptReject")
  // async documentAcceptReject(@Req() req, @Res() res, @Body() dto: any) {
  //   const newDto = Object.assign(dto);
  //   const data = await this.claimService.editDocument(newDto);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Claim Created Successfully',
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Get(':id')
  // async getOneclaimdealer(@Req() req, @Res() res, @Param('id') id: number) {
  //   const data = await this.claimService.getOneclaimdealer(id);
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Get One Successfully',
  //     data: data
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Put('editDealer/:id')
  // @UseInterceptors(FilesInterceptor('files', 100, { // Adjust the number based on your needs
  //   storage: diskStorage({
  //     destination: './claimUploads',
  //     filename: (req, file, cb) => {
  //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  //       cb(null, `${randomName}${extname(file.originalname)}`);
  //     }
  //   })
  // }))
  // async updatePolicy(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body: any,
  //   @Param('id') id: number,
  //   @Res() res,
  // ) {

  //   const { claim } = body;
  //   const claimData = JSON.parse(claim);
  //   let data;
  //   var doc = claimData.ClaimAttachments;
  //   delete claimData.ClaimAttachments;
  //   const newDto = Object.assign(claimData, CreateDowClaimDto);
  //   data = await this.claimService.editOneclaimdealer(id, newDto);
  //   if (files && files.length > 0) {
  //     files.forEach((file) => {
  //       const documentTypeInfo = doc.find(x => x.documentName == file.originalname) || {};
  //       console.log(documentTypeInfo);
  //       const attachmentData: ClaimDocument = {
  //         claimId: claimData.claimId,
  //         documentName: file.originalname,
  //         uniqeDocumentName: file.filename,
  //         documentTypeId: documentTypeInfo.documentTypeId || 0,
  //         uplodedBy: newDto.uploadedBy || 'Unknown',
  //         uplodedDate: new Date(),
  //         claimDocumentId: 0,
  //         description: documentTypeInfo.description,
  //         statusId: documentTypeInfo.statusId || 0
  //       };
  //       this.claimService.saveAttachmentClaim(attachmentData);
  //     });
  //   }
  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Claim Edited Successfully',
  //     // data:data
  //   };
  //   res.status(200).json(respDto);
  // }

  // @Get('getPolicyDataById/:id')
  // async getOnePolicyData(@Req() req, @Res() res, @Param('id') id: number) {
  //   const policyUpload = await this.claimService.getOnePolicyUploadData(id);
  //   const policy = await this.claimService.getOnePolicyData(policyUpload.policyId);
  //   const delear = await this.claimService.getOneDelearByCode(policyUpload.dealerCode);
  //   const ic = await this.claimService.getOneICById(policy.icId);
  //   const claimDocType = await this.claimService.getClaimDocumentType()


  //   const respDto: IResponseDto = {
  //     isSuccess: true,
  //     status: 'success',
  //     message: 'Get One Successfully',
  //     data: { policyUpload, policy, delear, ic, claimDocType }

  //   };
  //   res.status(200).json(respDto);
  // }
}
