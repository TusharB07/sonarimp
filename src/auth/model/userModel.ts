// // import { Query, Schema, Document, Model } from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import { ITenantAware, decryptData, tenantAwareModel } from "./common";
// // import diffHistory from 'mongoose-diff-history/diffHistory';
// // import diffHistory from "../utils/diffHistory";
// // import { logger } from "../winston";
// // import { Email } from "../utils/email";
// // import { AllowedActions, EmailTemplate } from "./emailTemplateModel";
// // import { IResponseDto } from "../interfaces";
// // import { AppError } from "../utils/appError";
// import { Injectable, Logger } from '@nestjs/common';

import { QmsUsers } from "src/masters/user/entity/QmsUsers";
import { ITenantAware } from "./common";


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     IUser:
//  *       type: object
//  *       required:
//  *         - name
//  *         - email
//  *         - mobileNumber
//  *       properties:
//  *         reportToId:
//  *           type: string
//  *           description: ObjectId of the IUser record this user reports to.
//  *         name:
//  *           type: string
//  *         email:
//  *           type: string
//  *         mobileNumber:
//  *           type: string
//  *         password:
//  *           type: string
//  *         passwordConfirm:
//  *           type: string
//  *         partnerId:
//  *           type: string
//  *
//  *
//  */
export interface IUser {
  // reportToId: Schema.Types.ObjectId;
  name: string;
  email: string;
  userEmail: string;
  mobileNumber: string;
  // roleId: Schema.Types.ObjectId;
  role: string;
  userRole: string;
  photo: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  passwordResetOtp: string;
  passwordResetOtpExpires: Date;
  active: boolean;
  age: number;
  zone: number;
  branchCode: number;
  configSidebarIsOpen: boolean;
  configMenuType: string;
  configColorScheme: string;
  configRippleEffect: boolean;
  underWriterLevel: number;
  attemptCount: number;
  isLocked: boolean;
  otp: Number;
  otpExpiresAt: Date;
  otpAttemptCount: number;
  otpVerified: Boolean;
  passwordExpiresAt: Date;
  accessToken: string;
  lastLogin: Date;
  staffCode: number;
  vendorName: string;
  agentCode: string;
  // branchId: Schema.Types.ObjectId;
  acceptedTermsAndConditions: boolean;
  address: string;

  // cityId: Schema.Types.ObjectId;
  // districtId: Schema.Types.ObjectId;
  // stateId: Schema.Types.ObjectId;
  // pincodeId: Schema.Types.ObjectId;
  // countryId: Schema.Types.ObjectId;
}

export interface IUserDocument extends IUser, Document, ITenantAware {
  correctPassword: (enteredPassword: string, userPassword: string) => Promise<Boolean>;
  changedPasswordAfter: (jwtTimestamp: number) => Boolean;
  createPasswordResetToken: () => string;
  sendMailOnUserCreation: (user: object) => string
}

export const _USER_ROLES = {
  admin: "admin",
  operations: "operations",
  insurer_admin: "insurer_admin",
  insurer_underwriter: "insurer_underwriter",
  insurer_rm: "insurer_rm",
  broker_admin: "broker_admin",
  broker_rm: "broker_rm",
  broker_creator: "broker_creator",
  broker_approver: "broker_approver",
  broker_creator_and_approver: "broker_creator_and_approver",
  agent: "agent",
  banca_admin: "banca_admin",
  banca_rm: "banca_rm",
  banca_creator: "banca_creator",
  banca_approver: "banca_approver"
};

// export interface IUserModel extends IUserDocument {
//   sendMailOnUserCreation(user: object): unknown;
//   findByEmail: (email: string) => Promise<IUserDocument>;
// }
export interface IUserModel {
  sendMailOnUserCreation(user: object): unknown;
  findByEmail(email: string): Promise<QmsUsers>;
}

// const UserSchema = new Schema<IUserDocument, IUserModel>({
//   // Parent referencing...
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User"
//   },
//   branchId: {
//     type: Schema.Types.ObjectId,
//     ref: "BranchMaster"
//   },
//   zone: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: [true, "Please tell us your name!"]
//   },
//   age: Number,
//   email: {
//     type: String,
//     required: [true, "Email is mandatory!"],
//     unique: true,
//     // lowercase: true,
//     // validate: [validator.isEmail, "Please provide a valid email!"]
//   },
//   userEmail: {
//     type: String,
//     required: [true, "User Email is mandatory!"],
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, "Please provide a valid user email!"]
//   },
//   mobileNumber: {
//     type: String,
//     required: [true, "Mobile number is mandatory!"],
//     unique: true,
//     lowercase: true,
//     validate: {
//       validator: function (val): boolean {
//         // this only points to current doc on NEW document creation.
//         // return val < this.price;
//         // TODO: Create the logic here to make sure that mobile numbers are
//         // 1. 10 digits
//         // 2. Start with one of 9,8,7,6...

//         return true;
//       },
//       message: "Mobile number has to be 10 digits and start with 9,8,7,6 only."
//     }
//   },
//   roleId: {
//     type: Schema.Types.ObjectId,
//     required: [true, "Every user must be assigned one role"],
//     ref: "Role"
//     // enum: {
//     //   values: [
//     //     "admin",
//     //     "operations",
//     //     "insurer_admin",
//     //     "insurer_underwriter",
//     //     "insurer_rm",
//     //     "broker_admin",
//     //     "broker_rm",
//     //     "broker_creator",
//     //     "broker_approver",
//     //     "agent",
//     //     "banca_admin",
//     //     "banca_rm",
//     //     "banca_creator",
//     //     "banca_approver"
//     //   ],
//     //   message:
//     //     "Role must be either: admin,operations,insurer-admin,insurer-underwriter,insurer-rm,broker-admin,broker-rm,broker-creator,broker-approver,agent,banca-admin,banca-rm,banca-creator,banca-approver."
//     // }
//   },
//   mappedPlacementUsers: [{
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   }],
//   photo: {
//     type: String,
//     default: "default.jpg"
//   },
//   password: {
//     type: String,
//     required: [true, "Provide a password"],
//     minlength: 8,
//     select: false
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, "Provide confirm your password"],
//     validate: {
//       // Cannot use arrow function as we need to use the "this" keyword.
//       // Also please note that from the custom validator function we are supposed to return true or false.
//       // When we return false we get a validation error, and not when we return true.
//       // This only works on CREATE and SAVE.
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: "Passwords do not match."
//     }
//   },
//   passwordChangedAt: Date,
//   // This is the actual password reset token stored as an encrypted string.
//   passwordResetToken: String,
//   // This is till when the last password reset token is active.
//   passwordResetExpires: Date,
//   passwordResetOtp: String,
//   passwordResetOtpExpires: Date,
//   active: {
//     type: Boolean,
//     default: true
//     // select: false,
//   },
//   configSidebarIsOpen: {
//     type: Boolean,
//     default: true
//   },
//   configMenuType: {
//     type: String,
//     enum: ["static", "overlay", "slim", "sidebar", "horizontal"],
//     default: "horizontal"
//   },
//   configColorScheme: {
//     type: String,
//     enum: ["light", "dark"],
//     default: "light"
//   },
//   configRippleEffect: {
//     type: Boolean,
//     default: true
//   },
//   underWriterLevel: {
//     type: Number
//   },
//   attemptCount: {
//     type: Number,
//     default: 0
//   },
//   isLocked: {
//     type: Boolean,
//     default: false
//   },
//   otp: {
//     type: Number
//   },
//   otpExpiresAt: {
//     type: Date
//   },
//   otpAttemptCount: {
//     type: Number
//   },
//   otpVerified: {
//     type: Boolean,
//     default: false
//   },
//   passwordExpiresAt: {
//     type: Date
//   },
//   accessToken: {
//     type: String
//   },
//   userRole: {
//     type: String
//   },
//   lastLogin: {
//     type: Date
//   },
//   branchCode: {
//     type: Number,
//   },

//   staffCode: {
//     type: Number
//   },
//   vendorName: {
//     type: String,
//     required: [true, "Provide a Vendor Name"],
//   },
//   agentCode: {
//     type: String,
//     required: [true, "Provide a Agent Code"],
//   },
//   acceptedTermsAndConditions: {
//     type: Boolean,
//     default: false
//   },
//   address: String,
//   cityId: {
//     type: Schema.Types.ObjectId,
//     ref: "CityMaster",
//     // required: [true, "Partner must have a city"]
//   },
//   districtId: {
//     type: Schema.Types.ObjectId,
//     ref: "DistrictMaster",
//     // required: [true, "Partner must have a district"]
//   },
//   stateId: {
//     type: Schema.Types.ObjectId,
//     ref: "StateMaster",
//     // required: [true, "Partner must have a state"]
//   },
//   countryId: {
//     type: Schema.Types.ObjectId,
//     ref: "CountryMaster",
//     // required: [true, "Partner must have a country"]
//   },
//   pincodeId: {
//     type: Schema.Types.ObjectId,
//     ref: "PincodeMaster",
//     // required: [true, "Partner must have a pincode"]
//   },
// });
// UserSchema.plugin(diffHistory.plugin);

// UserSchema.index({ email: 1, partnerId: 1 });

// // VIRTUALS

// // DOCUMENT MIDDLEWARE
// // Between getting data and saving it to the DB.
// UserSchema.pre<IUserDocument>("save", async function (next) {
//   if (!this.tenantId && this.partnerId) {
//     this.tenantId = `User-${this.partnerId}`;
//   }
//   // If password was not changed then we don't need to encrypt.
//   if (!this.isModified("password")) {
//     return next();
//   }

//   // The second argument here is called the cost.
//   // The higher the number the more costly it is to encrypt this password and the more costly it will be to decrypt it.
//   // The hash that we have used below is the asynchronous version, there is a synchronous version also.
//   this.password = await bcrypt.hash(this.password, 2);
//   // Get today's date
//   const today = new Date();

//   // Calculate the date one month from today
//   const nextMonth = new Date(today);
//   nextMonth.setMonth(nextMonth.getMonth() + 1);

//   // Handle cases where the day of the next month might not be valid
//   if (nextMonth.getDate() !== today.getDate()) {
//     nextMonth.setDate(0); // Set to the last day of the previous month
//   }

//   this.passwordExpiresAt = nextMonth;
//   // Get rid of the passwordConfirm field, all we need this field is for the validation.
//   this.passwordConfirm = undefined;

//   next();
// });

// UserSchema.pre<IUserDocument>("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   // sometimes it can happen that saving the below changed at date is slower than issuing the JWT.
//   // in this case after changing the password the user will still not be able to login with the newly generated JWT.
//   // the subtraction below.
//   this.passwordChangedAt = new Date(Date.now() - 1000);
//   next();
// });

// // QUERY MIDDLEWARE
// // Make sure we are loading only active users.
// UserSchema.pre<Query<IUserDocument[], IUserDocument>>(/^find/, function (next) {
//   // TODO: HP to implement generic soft delete functionaliyt.
//   // this.find({ active: { $ne: false } });

//   next();
// });

// // AGGREGATION MIDDLEWARE

// // INSTANCE METHODS
// UserSchema.methods.correctPassword = async function (enteredPassword, userPassword) {
//   const start = Date.now();

//   // Ideally we can do this.password, which would then be the users password and compare it against the enteredPassword
//   // However since we have marked the password field as select: false, we have to explicitly expect the user password as an argument.
//   // This method is supposed to return true if the password match, false otherwise.

//   const t = await bcrypt.compare(enteredPassword, userPassword);
//   const end = Date.now();
//   Logger.log(`UserSchema.methods.correctPassword took execution time: ${end - start} ms`);

//   return t;
// };

// UserSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
//   // The passwordChangedAt property will be present on a document only for users who have changed their password at-least once.

//   // To test this we need to manually create a user on whom this property has been set.
//   // We need to do this as we have not yet implemented the change password functionality.
//   if (this.passwordChangedAt) {
//     // convert the passwordChangedAt to the same format as we have jwtTimestamp variable in.
//     const changedTimestamp: number = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);

//     // console.log(changedTimestamp, JWTTimestamp);
//     // console.log(this.passwordChangedAt, JWTTimestamp);

//     return jwtTimestamp < changedTimestamp;
//   }

//   // Password has not changed.
//   return false;
// };

// UserSchema.methods.createPasswordResetToken = function () {
//   // This token is what we are going to send to the user.
//   // This is like a reset password, this is accessible only to the user to whom we are sending this over email.
//   // We will send the plain text over email, and store the encypted version in the database. Then we will use the 2 to compare.
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   // We will also encrypt the reset token.
//   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

//   // console.log({ resetToken }, this.passwordResetToken);
//   Logger.log(`reset token - ${resetToken},passwordresettoken - ${this.passwordResetToken}`);
//   // expires in 10 minutes from now.
//   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

//   return resetToken;
// };

// UserSchema.statics.sendMailOnUserCreation = async function (user) {
//   let senderName = user.name;
//   const url = process.env.WEB_URL;
//   const data = {
//     senderName: senderName,
//     url: url,
//     userToBeSend: user.userEmail,
//     userId: user.email,
//     userPassword: user.password
//   };
//   const emailNotification = new Email(data);
//   const emailTemplate = await EmailTemplate().findOne({ action: AllowedActions.USER_CREATION, active: true });
//   if (emailTemplate) {
//     await emailNotification.sendUserCreation(emailTemplate.body, emailTemplate.subject);
//   } else {
//     return new AppError(`Email template Not Found`, 400)
//   }
// };


// // STATIC METHODS
// UserSchema.statics.findByEmail = function (email: string) {
//   return this.findOne({ email });
// };

// export const User = tenantAwareModel<IUserDocument, IUserModel>("User", UserSchema);

// // Initialize the model once.
// User({ skipTenant: true });
