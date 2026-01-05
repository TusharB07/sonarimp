// import { Occupancy } from './occupancyModel';
// import mongoose, { Model, Schema, Query, Document, ObjectId } from "mongoose";
// import { AppError } from "../utils/appError";
import { AsyncLocalStorage } from "async_hooks";
// import { IAsyncStoreCtxt, IBulkImportSampleResponseDto, IResponseDto } from "../interfaces";
// import ExcelJS from "exceljs";
// import { object } from "yup";
// import { IUser, IUserDocument } from "./userModel";
// import { AllowedSequences, Sequence } from "./sequenceModel";
// import { IMappedRmEmailICName, IPartnerDocument } from "./partnerModel";
// import bcrypt from "bcryptjs";
// import { IProductMasterDocument } from "./productMasterModel";
// import { AddOnCoverSector } from "./addonCoverSectorModel";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IAsyncStoreCtxt } from "src/interfaces";
// import { logger } from "../winston";
// import { AllowedOtcTypes, ProductPartnerIcConfiguration } from "./productPartnerIcConfigurationModel";
// import { IQuoteSlipDocument } from "./quoteSlipModel";
// import { IListOfValuesMasterDocument, ListOfValuesMaster } from "./listOfValuesMasterModel";
import { Injectable, Logger } from '@nestjs/common';

const CryptoJS = require("crypto-js");
const fs = require("fs");


export const requestAsyncLocalStorageCtxt = new AsyncLocalStorage<IAsyncStoreCtxt>();

// - - - - - - - - - -
// Query helpers
// - - - - - - - - - -
export interface IQueryHelpers<D> {
  // isCurrentlyApplicable(riskDate: Date): Query<any, D> & IQueryHelpers<D>;
  // findBySumInsured(sumInsured: number): Query<any, D> & IQueryHelpers<D>;
  // getDiffInDays(firsteDate: Date, secondDate: Date): Query<any, D> & IQueryHelpers<D>;
  // recomputeAggregate(model: any, match: any, group: any): Query<any, D> & IQueryHelpers<D>;
  // incrementIdentity(model: any, allowedSequences: AllowedSequences, partnerId: string): Query<any, D> & IQueryHelpers<D>;
  // createProductPartnerCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument, occupancyWiseRate: Boolean, model2: any): Query<any, D> & IQueryHelpers<D>;
  // updateProductPartnerCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument, occupancyWiseRate: Boolean, model2: any): Query<any, D> & IQueryHelpers<D>;
  // checkOtcNonOTcBscILov(model: any, model2: any, quote: IQuoteSlipDocument, lov: IListOfValuesMasterDocument): Query<any, D> & IQueryHelpers<D>;
  // checkOtcNonOTcBscCovers(model: any, quote: IQuoteSlipDocument, maxNstp: Number, bscType: string): Query<any, D> & IQueryHelpers<D>;
  // passwordOtpVerify(otp: string, email: string, user: IUserDocument): Query<any, D> & IQueryHelpers<D>;
  // uploadFile(model: any, response: any, req: any): Query<any, D> & IQueryHelpers<D>;
}

export function isCurrentlyApplicable(riskDate: Date) {
  // const datenow = new Date();
  const datenow = riskDate;
  return this.find({ applicableFrom: { $lte: datenow }, applicableTo: { $gte: datenow } });
}

export function findBySumInsured(sumInsured: number) {
  return this.find({ fromSI: { $lte: sumInsured }, toSI: { $gte: sumInsured } });
}

export function getDiffInDays(firsteDate: Date, secondDate: Date) {
  var seconds = Math.floor((secondDate.getTime() - firsteDate.getTime()) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function recomputeAggregate(model: any, match: any, group: any) {
  const currentUser = requestAsyncLocalStorageCtxt.getStore()?.currentUser;
  var skipTanentProps = currentUser["partnerId"].brokerModeStatus ? { skipTenant: true } : { skipTenant: false }
  return model(skipTanentProps).aggregate([
    { $match: match },
    {
      $group: group
    }
  ]);
}

// export async function incrementIdentity(model: any, allowedSequences: AllowedSequences, partnerId: string) {
//   const sequence = await model.findOne({ name: { $eq: allowedSequences }, partnerId: partnerId });
//   return await sequence.next();
// }

// export async function createProductPartnerCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument, occupancyWiseRate: Boolean, model2: any) {
//   // const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id, productId: productId });
//   const createIds = [];
//   // for (let i = 0; i < modelRecords.length; i++) {
//   //   const a = modelRecords[i];
//   //   const ClonedModel = cloneDocument(a, model({ skipTenant: true }));
//   //   ClonedModel.partnerId = partnerId;
//   //   // ClonedModel.tenantId = `${model}-${partnerId}`;
//   //   const createModelDocument = await model({ skipTenant: false, specifiedPartnerId: partnerId }).create(ClonedModel);
//   //   createIds.push(createModelDocument._id);
//   // }

//   // # Below Code check the Existing record with same partner & idendity available then create new recor
//   // 1. Filter All Model record with self partner and product ID
//   const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id, productId: productId });
//   const identities = [];
//   // 2. All identities put in array
//   for (let i = 0; i < modelRecords.length; i++) {
//     identities.push(modelRecords[i].identity);
//   }
//   // 3. check Partner has existing record
//   const modelExist = await model({ skipTenant: true }).find({ identity: { $in: identities }, partnerId: partnerId });
//   const existingIdentities = [];
//   modelExist.forEach(async (m, index) => {
//     existingIdentities.push(m.identity);
//   });
//   // 4. Create model record which are doesn't exist for partner
//   for (let i = 0; i < modelRecords.length; i++) {
//     const a = modelRecords[i];
//     if (!existingIdentities.includes(a.identity)) {
//       const ClonedModel = cloneDocument(a, model({ skipTenant: true }));
//       ClonedModel.partnerId = partnerId;
//       if (occupancyWiseRate && productId.isOccupancyWiseRate) {
//         if (a.occupancyId) {
//           const occupancy = await model2({ skipTenant: true }).findById(a.occupancyId);
//           const partnerOccupancy = await model2({ skipTenant: true }).findOne({ partnerId: partnerId, identity: occupancy.identity })
//           ClonedModel.occupancyId = partnerOccupancy._id;
//         }
//       }
//       // ClonedModel.tenantId = `${model}-${partnerId}`;
//       const createModelDocument = await model({ skipTenant: false, specifiedPartnerId: partnerId }).create(ClonedModel);
//       createIds.push(createModelDocument._id);
//     }
//   }
//   return createIds;
// }

// export async function createProductPartnerGMCCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument) {
//   // const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id, productId: productId });
//   const createIds = [];
//   // # Below Code check the Existing record with same partner & idendity available then create new recor
//   // 1. Filter All Model record with self partner and product ID
//   const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id });
//   const identities = [];
//   // 2. All identities put in array
//   for (let i = 0; i < modelRecords.length; i++) {
//     identities.push(modelRecords[i].identity);
//   }
//   // 3. check Partner has existing record
//   const modelExist = await model({ skipTenant: true }).find({ identity: { $in: identities }, partnerId: partnerId });
//   const existingIdentities = [];
//   modelExist.forEach(async (m, index) => {
//     existingIdentities.push(m.identity);
//   });
//   // 4. Create model record which are doesn't exist for partner
//   for (let i = 0; i < modelRecords.length; i++) {
//     const a = modelRecords[i];
//     if (!existingIdentities.includes(a.identity)) {
//       const ClonedModel = cloneDocument(a, model({ skipTenant: true }));
//       ClonedModel.partnerId = partnerId;
//       // ClonedModel.tenantId = `${model}-${partnerId}`;
//       const createModelDocument = await model({ skipTenant: false, specifiedPartnerId: partnerId }).create(ClonedModel);
//       createIds.push(createModelDocument._id);
//     }
//   }
//   return createIds;
// }

// export async function updateProductPartnerCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument, occupancyWiseRate: Boolean, model2: any) {
//   // 1. Filter All Model record with self partner and product ID
//   const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id, productId: productId });

//   const identities = [];
//   const existingIdentities = [];

//   // 2. All identities put in array
//   for (let i = 0; i < modelRecords.length; i++) {
//     identities.push(modelRecords[i].identity);
//   }

//   // 3. check Partner has existing record
//   const modelExist = await model({ skipTenant: true }).find({ identity: { $in: identities }, partnerId: partnerId });

//   modelExist.forEach(async (m, index) => {
//     existingIdentities.push(m.identity);
//   });
//   const createIds = [];
//   // 4. Create model record which are doesn't exist for partner
//   // Note: we are not updating modelExist record because while update data in Model in that functionality we are updating for all record which matching with identities
//   for (let i = 0; i < modelRecords.length; i++) {
//     const a = modelRecords[i];
//     if (!existingIdentities.includes(a.identity)) {
//       const ClonedModel = cloneDocument(a, model({ skipTenant: true }));
//       ClonedModel.partnerId = partnerId;
//       if (occupancyWiseRate && productId.isOccupancyWiseRate) {
//         if (a.occupancyId) {
//           const occupancy = await model2({ skipTenant: true }).findById(a.occupancyId);
//           const partnerOccupancy = await model2({ skipTenant: true }).findOne({ partnerId: partnerId, identity: occupancy.identity })
//           ClonedModel.occupancyId = partnerOccupancy._id;
//         }
//       }
//       // ClonedModel.tenantId = `${model}-${partnerId}`;
//       const createModelDocument = await model({ skipTenant: false, specifiedPartnerId: partnerId }).create(ClonedModel);
//       createIds.push(createModelDocument._id);
//     }
//   }
//   return createIds;
// }

// export async function updateProductPartnerGMCCopy(model: any, selfPartner: IPartnerDocument, partnerId: IPartnerDocument, productId: IProductMasterDocument) {
//   // 1. Filter All Model record with self partner and product ID
//   const modelRecords = await model({ skipTenant: true }).find({ partnerId: selfPartner._id });

//   const identities = [];
//   const existingIdentities = [];

//   // 2. All identities put in array
//   for (let i = 0; i < modelRecords.length; i++) {
//     identities.push(modelRecords[i].identity);
//   }

//   // 3. check Partner has existing record
//   const modelExist = await model({ skipTenant: true }).find({ identity: { $in: identities }, partnerId: partnerId });

//   modelExist.forEach(async (m, index) => {
//     existingIdentities.push(m.identity);
//   });
//   const createIds = [];
//   // 4. Create model record which are doesn't exist for partner
//   // Note: we are not updating modelExist record because while update data in Model in that functionality we are updating for all record which matching with identities
//   for (let i = 0; i < modelRecords.length; i++) {
//     const a = modelRecords[i];
//     if (!existingIdentities.includes(a.identity)) {
//       const ClonedModel = cloneDocument(a, model({ skipTenant: true }));
//       ClonedModel.partnerId = partnerId;
//       // ClonedModel.tenantId = `${model}-${partnerId}`;
//       const createModelDocument = await model({ skipTenant: false, specifiedPartnerId: partnerId }).create(ClonedModel);
//       createIds.push(createModelDocument._id);
//     }
//   }
//   return createIds;
// }

// export async function checkOtcNonOTcBscILov(model: any, model2: any, quote: IQuoteSlipDocument, lov: IListOfValuesMasterDocument) {
//   const productConf = quote.productPartnerIcConfigurations[0];
//   const brokerProductPartnerIC = await model().findOne({ _id: productConf.productPartnerIcConfigurationId });


//   let isLovRules = null;
//   let otcType = "OTC";
//   let IsAllowed = false;
//   let nonOtcBreachedValue = quote.nonOtcBreachedValue;
//   if (brokerProductPartnerIC && brokerProductPartnerIC.otcType == "BOTH") {
//     const partnerId: any = brokerProductPartnerIC.brokerPartnerId
//     const querylov = await model2({ skipTenant: true }).findOne({
//       identity: lov.identity,
//       partnerId: partnerId
//     });

//     isLovRules = brokerProductPartnerIC.lovRules.filter(
//       ter => JSON.stringify(ter.lovId) === JSON.stringify(querylov._id) && ter.isAllowed === true
//     );
//     logger.info(isLovRules[0]);

//     if (isLovRules[0]) {
//       otcType = "NONOTC";
//       IsAllowed = true;
//       // nonOtcBreachedValue = `SI Is Not In The Range for ${isLovRules[0].name}`;

//       nonOtcBreachedValue = `Sum Insured cannot be more than ${querylov.perEmployeeLimit} for ${isLovRules[0].name}`;
//     }
//   }
//   return [otcType, IsAllowed, nonOtcBreachedValue];
// };

// export async function checkOtcNonOTcBscCovers(model: any, quote: IQuoteSlipDocument, maxNstp: Number, bscType: string) {
//   const productConf = quote.productPartnerIcConfigurations[0];
//   const brokerProductPartnerIC = await model().findOne({ _id: productConf.productPartnerIcConfigurationId });


//   let isBscCoverRules = null;
//   let otcType = "OTC";
//   let IsAllowed = false;
//   let nonOtcBreachedValue = quote.nonOtcBreachedValue;
//   if (brokerProductPartnerIC && brokerProductPartnerIC.otcType == "BOTH") {
//     isBscCoverRules = brokerProductPartnerIC.bscCoverRules.filter(
//       ter => JSON.stringify(ter.name) === JSON.stringify(bscType) && ter.isAllowed === true
//     );
//     logger.info(isBscCoverRules[0]);

//     if (isBscCoverRules[0]) {
//       otcType = "NONOTC";
//       IsAllowed = true;

//       nonOtcBreachedValue = `Sum Insured cannot be more than ${maxNstp} for ${bscType}`;
//     }
//   }
//   return [otcType, IsAllowed, nonOtcBreachedValue];
// };

// export async function passwordOtpVerify(otp: string, email: string, user: IUserDocument) {
//   const decryptedOtp = decryptData(otp);

//   if (user.otpAttemptCount == 0) {

//     await user.updateOne({ otp: undefined });

//     logger.error(`status 400 - OTP Attemp Excceded ${email} `);

//     // return next(new AppError(`OTP Attemp Excceded`, 400));
//     const status = "fail";
//     const respDto: IResponseDto = {
//       status: status,
//       message: "OTP Attemp Excceded",
//       error: {}
//     };
//     return respDto
//   }

//   await user.updateOne({ otpAttemptCount: user.otpAttemptCount - 1 });

//   if (!user.otp) {
//     logger.error(`status 400 - No OTP Sent ${email} `);

//     // return next(new AppError(`No OTP Sent`, 400));
//     const status = "fail";
//     const respDto: IResponseDto = {
//       status: status,
//       message: "No OTP Sent",
//       error: {}
//     };

//     return respDto;
//   }
//   var now = new Date();
//   if (now >= user.otpExpiresAt) {
//     logger.error(`status 400 - OTP expired ${email} `);

//     // return next(new AppError(`OTP expired`, 400));
//     const status = "fail";
//     const respDto: IResponseDto = {
//       status: status,
//       message: "OTP expired",
//       error: {}
//     };

//     return respDto;
//   }
//   if (decryptedOtp != user.otp) {
//     logger.error(`status 400 - Invalid OTP ${email} `);

//     // return next(new AppError(`Invalid OTP`, 400));
//     const status = "fail";
//     const respDto: IResponseDto = {
//       status: status,
//       message: "Invalid OTP",
//       error: {}
//     };
//     return respDto;
//   }

//   // await user.updateOne({ otpVerified: true });

//   const status = "success";
//   const respDto: IResponseDto = {
//     status: status,
//     otpVerified: true
//   };

//   return respDto;
// };


// export async function uploadFile(model: any, bscResponse, req: any) {
//   let newResponse = null;
//   if (req.file) {
//     // const fileCheckerResponse = await xlSheetValidator(req?.file?.path);
//     let ext = req.file.mimetype == 'image/jpeg' ? 'jpeg' : (req.file.mimetype == 'application/pdf' ? 'pdf' : 'xlsx')

//     const OldPath = req?.file?.path;
//     const newPath = `${req?.file?.destination}/${bscResponse._id}.${ext}`

//     const updatedPath = fs.rename(OldPath, newPath, function (err) {
//       if (err) console.log('ERROR: ' + err);
//     });
//     newResponse = await model.findOneAndUpdate({ _id: bscResponse._id }, { filePath: newPath }, { new: true });
//   }

//   if (bscResponse && bscResponse.filePath && !req.file) {
//     newResponse = await model.findOneAndUpdate({ _id: bscResponse._id }, { filePath: bscResponse.filePath }, { new: true });
//   }

//   // const newBscEquipment = await model.findOne({ _id: response._id})
//   return newResponse ?? bscResponse;
// };

// - - - - - - - - -
// Common interfaces for documents.
export interface IApplicableDateRangeAware {
  applicableFrom: Date;
  applicableTo: Date;
}

export interface ISumInsuredBetweenAware {
  fromSI: Number;
  toSI: Number;
}

export interface ITenantAware {
  tenantId: string;
  partnerId: string;
}

export interface ITenantModelProps {
  skipTenant?: Boolean;
  specifiedPartnerId?: String;
}

// - - - - - - - - - - - - - -
// Multi tenancy
// - - - - - - - - - - - - - -
// https://thecodebarbarian.com/2015/07/24/guide-to-mongoose-discriminators
// Mindset behind implementing the multi-tenancy using the mongoose discriminators.
// export function tenantAwareModel<D extends ITenantAware, M extends Model<D>>(name: string, schema: Schema<D, M>) {
//   return (props: ITenantModelProps = { skipTenant: false, specifiedPartnerId: null }): M => {
//     schema.add({
//       tenantId: String
//     });
//     schema.add({
//       partnerId: {
//         type: Schema.Types.ObjectId,
//         ref: "Partner"
//       }
//     });

//     const Model = mongoose.model<D, M>(name, schema);

//     // If skip tenant is specified then we return the model AS-IS.
//     const { skipTenant, specifiedPartnerId } = props;
//     if (skipTenant) {
//       return Model;
//     }

//     // Next we try to resolve the tenant.
//     // TODO: For some reason if we are unable to get a valid tenantId at this stage then do we want to raise an exception?
//     // Or do we stamp the ID of the common partner discriminator?

//     // @ts-ignore
//     const requestTenantId = requestAsyncLocalStorageCtxt.getStore()?.tenantId;
//     // @ts-ignore
//     // const mongooseTenantId = mongooseAsyncLocalStorageCtxt.getStore()?.tenantId;
//     // const tenantId = requestTenantId || mongooseTenantId || specifiedPartnerId;
//     const tenantId = specifiedPartnerId || requestTenantId;

//     // For admin users we return immediately.
//     if (tenantId === "-666") {
//       return Model;
//     }

//     if (!tenantId) {
//       logger.error(`Invoking tenantAwareModel, but unable to resolve tenantId 500`);

//       // If tenantId was not found, and we are not the admin user then we throw an error.
//       throw new AppError("Invoking tenantAwareModel, but unable to resolve tenantId.", 500);
//     }

//     // At this point we are sure that a tenant has been resolved.

//     // Registered a document middleware that will stamp the partnerId based on the current tenant.
//     schema.pre<D>("save", function (next) {
//       // if (this.partnerId) {
//       //   logger.info(`Found document with partnerId ${this.partnerId} already specified.`);
//       // }

//       const tenantId = requestAsyncLocalStorageCtxt.getStore()?.tenantId;

//       // For admin users we return immediately.
//       // If the current user is not an admin user, if the entity being saved does not have the partner already,
//       // then we set the current tenantId as the partnerId.
//       if (tenantId !== "-666" && !this.partnerId && tenantId) {
//         this.partnerId = tenantId;
//       }

//       next();
//     });

//     Model.schema.set("discriminatorKey", "tenantId");

//     const discriminatorName = `${Model.modelName}-${tenantId}`;
//     const existingDiscriminator = (Model.discriminators || {})[discriminatorName];
//     const r = existingDiscriminator || Model.discriminator(discriminatorName, new Schema<D, M>({}));

//     return r as M;
//   };
// }

// export function tenantUnawareModel<D, M extends Model<D>>(name: string, schema: Schema<D, M>) {
//   return () => mongoose.model<D, M>(name, schema);
// }

// - - - - - - - - - - - - -
// A few utility functions
// - - - - - - - - - - - - -
// export const cloneDocument = <D extends Document, M extends Model<D>>(doc: D, Model: M): D => {
//   // const copyjson = {...doc}
//   // doc['_id'] = undefined
//   // doc['partnerId'] = partnerId;
//   // doc['tenantId']= `Occupancy-${partnerId}`;

//   const copyDoc = new Model({
//     ...doc.toObject(),
//     _id: undefined,
//     partnerId: undefined,
//     tenantId: undefined
//   });
//   // const copyDoc = new Model({copyjson.toObject()})
//   copyDoc.isNew = true;

//   return copyDoc;
// };

export interface FailedValidationType {
  rowIndex: number;
  error: string;
  columnIndex?: number;
}

export interface ILov<V = string> {
  label: string;
  value: V;
}

// Broker Dashboard Interface ----------------------------------------------------------------------

interface BrokerDashboardCard {
  value: number;
  subValue?: number;
}

interface BrokerDashboardClientItem {
  clientName: string;
  pendingQuotes: number;
  people?: any[];
}

interface BrokerDashboardStageItem {
  clientName: string;
  productName: string;
  stage: string;
  quoteId: string;
}

export interface BrokerDashboardResponse {
  quotesOpenedCard?: BrokerDashboardCard;
  quotesPlacedCard?: BrokerDashboardCard;
  quotesPlacedRatioCard?: BrokerDashboardCard;

  quotesPendingWithInsurerCard?: BrokerDashboardCard;
  totalPremiumOfAllQuotesCard?: BrokerDashboardCard;
  totalComissionTillDateCard?: BrokerDashboardCard;

  clients?: BrokerDashboardClientItem[];
  stages?: BrokerDashboardStageItem[];

  productWiseCountGraph?: ILov[];
  productWiseTatGraph?: ILov[];

  averageBrokerTat?: ILov<number>[];
}
export interface InsurerDashboardResponse {
  quotesPendingCardForInsurer: BrokerDashboardCard;
  quotesPlacedCardForInsurer: BrokerDashboardCard;
  quotesPlacedRatioCard?: BrokerDashboardCard;

  quotesPendingWithUnderWriterCard: BrokerDashboardCard;
  totalPremiumOfAllQuotesCard?: BrokerDashboardCard;
  totalComissionTillDateCard?: BrokerDashboardCard;

  clients?: BrokerDashboardClientItem[];
  stages?: BrokerDashboardStageItem[];

  productWiseCountGraph?: ILov[];
  productWiseTatGraph?: ILov[];

  averageInsurerTat?: ILov<number>[];
}

export interface underWriterDashboardResponse {
  quotesPendingCardForUnderWriter: BrokerDashboardCard;
  quotesPlacedCardForUnderWriter: BrokerDashboardCard;
  quotesPlacedRatioCard?: BrokerDashboardCard;

  quotesPendingWithUnderWriterCard: BrokerDashboardCard;
  totalPremiumOfAllQuotesCard?: BrokerDashboardCard;
  totalComissionTillDateCard?: BrokerDashboardCard;

  clients?: BrokerDashboardClientItem[];
  stages?: BrokerDashboardStageItem[];

  productWiseCountGraph?: ILov[];
  productWiseTatGraph?: ILov[];

  averageUnderWriterTat?: ILov<number>[];
}

// export interface BrokerDashboardRequest {
//   startDate: Date;
//   endDate: Date;
//   createdById: ObjectId;
//   user: IUser;
// }
// export interface InsurerDashboardRequest {
//   startDate: Date;
//   endDate: Date;
//   currentUserId: ObjectId;
//   user: IUser;
// }

// export interface underWriterDashboardRequest {
//   startDate: Date;
//   endDate: Date;
//   createdById: ObjectId;
//   roleName: string;
// }
// ------------------------------------------------------------------------------------------------

export interface ITatResponse {
  timestamp: Date;
  diffSeconds?: number;
  diffMinutes?: number;
  diffHours?: number;
  diffDays?: number;
  diffForHumans?: string;
}

// -------------------------------------------------------------------------------------------------
// interface IExcelHelperWorkSheetOptions {
//   columns: Partial<ExcelJS.Column>[];
//   protected?: boolean;
//   hidden?: boolean;
// }

// export class ExcelHelper {
//   public workbook: ExcelJS.Workbook;
//   private worksheets: Array<{
//     name: string;
//     sheet: ExcelJS.Worksheet;
//   }> = [];

//   constructor() {
//     this.workbook = new ExcelJS.Workbook();
//   }

//   async addWorkSheet(name: string, options?: IExcelHelperWorkSheetOptions) {
//     let worksheet = this.workbook.addWorksheet(name);
//     if (options.protected) {
//       await worksheet.protect("", {});
//     }

//     this.worksheets.push({
//       name: name,
//       sheet: worksheet
//     });

//     worksheet.columns = options.columns;

//     if (options.hidden) {
//       worksheet.state = "hidden";
//     }

//     return worksheet;
//   }

//   async addRow(
//     name: string,
//     data: (row: ExcelJS.Row) => {
//       [key: string]: Partial<ExcelJS.Cell>;
//     }
//   ) {
//     let worksheet = this.worksheets.find(item => item.name == name);

//     if (worksheet) {
//       const row = worksheet.sheet.lastRow;
//       for (const [columnKey, cellData] of Object.entries(data(row))) {
//         const column = worksheet.sheet.getColumn(columnKey);
//         const cell = worksheet.sheet.getCell(row.number + 1, column.number);

//         Object.assign(cell, { ...cellData });
//       }
//     }
//   }

//   async loadFromFile(filePath: string) {
//     await this.workbook.xlsx.readFile(filePath);

//     this.worksheets = this.workbook.worksheets.map(item => {
//       return {
//         name: item.name,
//         sheet: item
//       };
//     });
//   }

//   async sheetNotExistsCheck(name: string): Promise<IBulkImportSampleResponseDto | void> {
//     const wsData = this.workbook.getWorksheet(name);
//     if (!wsData) {
//       return {
//         status: "fail",
//         errorMessage: `Work book should contain one and only one sheet called '${name}'`,
//         statusCode: 400
//       };
//     }
//   }

//   async validateHeadersCheck(name: string, columns: Array<Partial<ExcelJS.Column>>): Promise<IBulkImportSampleResponseDto | void> {
//     let worksheet = this.worksheets.find(item => item.name == name);

//     if (worksheet) {
//       const headerRow = worksheet.sheet.getRow(1);

//       for (let i = 0; i < columns.length; i++) {
//         if (columns[i].header !== headerRow.values[i + 1]) {
//           return {
//             status: "fail",
//             errorMessage: `Invalid header found or sequence of headers is incorrect. Allowed values are [${columns
//               .map(item => item.header)
//               .join(", ")}] in the mentioned order.`,
//             statusCode: 400
//           };
//         }
//       }

//       // this.workbook.worksheets.find((item) => item.sheet.name == worksheet.sheet.name)
//       worksheet.sheet.columns = columns;
//     }
//   }

//   public allRecordsClean = true;

//   async objectify(name: string): Promise<Record<string, unknown>[]> {
//     let worksheet = this.worksheets.find(item => item.name == name);

//     let records: Record<string, unknown>[] = [];

//     if (worksheet) {
//       await worksheet.sheet.eachRow(function (row, rowNumber) {
//         if (row.number != 1) {
//           let rowObj = {};

//           if (!row.values[1]) {
//             return;
//           }

//           for (let i = 0; i < worksheet.sheet.columns.length; i++) {
//             if (rowObj["isNew"] == undefined) {
//               rowObj["isNew"] = row.getCell(i + 1).note ? false : true;
//             }

//             if (row.getCell(i + 1).value) {
//               rowObj[worksheet.sheet.columns[i].key] = row.getCell(i + 1).value;
//             }

//             if (row.getCell(i + 1).formula) {
//               rowObj[worksheet.sheet.columns[i].key] = row.getCell(i + 1).result;
//             }
//           }

//           records.push(rowObj);
//         }
//       });
//     }

//     return records;
//   }

//   async validate(
//     name: string,
//     options: {
//       records: Record<string, unknown>[];
//       yupSchema: Record<string, any>;
//     }
//   ): Promise<Record<string, unknown>[]> {
//     let allRecordsClean = true;
//     let worksheet = this.worksheets.find(item => item.name == name);

//     if (worksheet) {
//       const lastColumn = worksheet.sheet.lastColumn;
//       const afterLastColumn = worksheet.sheet.getColumn(lastColumn.number + 1);

//       for (const [index, rowObj] of Object.entries(options.records)) {
//         const rowNumber = Number(index) + 2;

//         //const email = '{"email":{"text":"mehbooblogicloops@gmail.com","hyperlink":"mailto:mehbooblogicloops@gmail.com"}}';
//         //if (worksheet.name == "Users") {
//         const email: any = rowObj.email;
//         const emailString = JSON.stringify(email);

//         if (emailString) {
//           // Regular expression pattern to match the email address
//           const pattern = /{"text":"(.*?)","hyperlink":"mailto:.*?"}/;

//           // Extract the email address using the pattern
//           const emailMatch = emailString.match(pattern);

//           // Check if a match is found and extract the email address
//           if (emailMatch && emailMatch.length >= 2) {
//             const email = emailMatch[1];
//             rowObj.email = email;
//             if (worksheet.name == "Users") {
//               const password = await bcrypt.hash(rowObj.email, 12);
//               rowObj["password"] = password;
//               rowObj["passwordConfirm"] = password;
//             }
//           }
//         }
//         let userEmail: any = rowObj.userEmail;
//         const userEmailString = JSON.stringify(userEmail);

//         if (userEmailString) {
//           // Regular expression pattern to match the email address
//           const pattern = /{"text":"(.*?)","hyperlink":"mailto:.*?"}/;

//           // Extract the email address using the pattern
//           const userEmailMatch = userEmailString.match(pattern);

//           // Check if a match is found and extract the email address
//           if (userEmailMatch && userEmailMatch.length >= 2) {
//             const userEmail = userEmailMatch[1];
//             rowObj.userEmail = userEmail;
//           }
//         }
//         //}
//         // Run the Intrinsic Validations.
//         logger.info(`Row ${rowNumber}=BeforeValidation[${JSON.stringify(rowObj)}]`);
//         try {
//           const r = await object(options.yupSchema).validate(rowObj, { abortEarly: false });
//           logger.info(`Row ${rowNumber}=AfterValidation[${JSON.stringify(r)}]`);
//         } catch (e) {
//           logger.info(`Row ${rowNumber}=${e.message}`);

//           worksheet.sheet.getCell(`${afterLastColumn.letter}${rowNumber}`).value = `${e.errors.join(";")}`;
//           allRecordsClean = false;
//         }
//       }
//     } else {
//       allRecordsClean = false;
//     }

//     return allRecordsClean ? options.records : undefined;
//   }

//   async processRecords(
//     records: Record<string, unknown>[] = [],
//     options: {
//       onCreate: (item) => Promise<void>;
//       onUpdate: (item) => Promise<void>;
//     }
//   ) {
//     for (const record of records) {
//       if (record.isNew === true) {
//         await options.onCreate(record);
//       } else {
//         await options.onUpdate(record);
//       }
//     }
//   }

//   async generate(name: string, options?: { hasError: boolean }) {
//     // Save the generated file to the public/uploads dir.
//     const fileName = `${name}${options?.hasError ? " With Error" : ""}-${Date.now()}.xlsx`;
//     const filePath = `${__dirname}/../public/uploads/${fileName}`;
//     await this.workbook.xlsx.writeFile(filePath);

//     return {
//       status: !options?.hasError ? "success" : "fail",
//       statusCode: !options?.hasError ? 201 : 400,
//       errorMessage: !options?.hasError ? "" : `Some rows fail the validations rules, please check the excel for errors.`,
//       remoteFileUrl: `${process.env.APP_BASE_URL}/uploads/${fileName}`
//     };
//   }
// }

export interface IPubishedTaskPayload<M> {
  // _id?: string,
  data: Partial<M>;
}

// export interface IPubishedSentToInsurerTaskPayload {
//   mappedIcNames: IMappedRmEmailICName[];
//   user: IUserDocument;
//   otcType: AllowedOtcTypes;
//   quote: IQuoteSlipDocument;
// }

export enum AllowedTaskStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed"
}
// export class ApiHelper {
//   static async makeApiCall(method: string, url: string, payload: any): Promise<any> {
//     try {
//       const response = await axios.post(url, payload);
//       return response.data; // Return the response data
//     } catch (error) {
//       logger.error(`Api Helper Error  -${error}`);
//       logger.error(error?.stack);

//       throw error;
//     }
//   }
// }

export function encryptData(data: String) {
  return CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
}

export function decryptData(data: String) {

  
  const start = Date.now();

  const bytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  const end = Date.now();
  Logger.log(`decryptData took execution time: ${end - start} ms`);
  return originalText;
}

// export async function xlSheetValidator(path: string) {
//   try {
//     // const file = reader.readFile(path);
//     const workbook = new ExcelJS.Workbook();
//     const fileData = await workbook.xlsx.readFile(path);
//     // const pdfData = await pdf(dataBuffer);
//     return { success: true };
//   } catch (error) {
//     logger.error(`Invalid File Format - ${error}`);
//     fs.rmSync(path, { recursive: true, force: true });
//     throw new AppError(`Invalid File Format`, 400);
//     // return { success: false };
//   }
// }

export enum AllowedZoneType {
  one = "I",
  two = "II",
  three = "III",
  four = "IV"
}

export const QUOTE_STATUS_FROM_DB_TO_NEW_NAME = {
  'Draft': "Request For Process (RFP)",
  'Pending Requisition For Quote': "Request For Process (RFP)",
  'Waiting For Approval': "Request For Quote (RFQ)",
  'Sent To Insurance Company RM': "Request For Quote (RFQ)",
  'Under Writter Review': "Request For Quote (RFQ)",
  'QCR From Underwritter': "Quote Comparsion Report (QCR)"
}

