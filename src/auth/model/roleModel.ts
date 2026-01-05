// import mongoose, { Document, Model, Schema } from "mongoose";
// import diffHistory from "../utils/diffHistory";
// import { tenantUnawareModel } from "./common";
// import { _USER_ROLES } from "./userModel";

export enum USER_ROLES {
  ADMIN = 'admin',
  OPERATIONS = 'operations', // Some one who can approve offline payment
  INSURER_ADMIN = 'insurer_admin',
  INSURER_UNDERWRITER = 'insurer_underwriter',
  INSURER_RM = 'insurer_rm',
  BROKER_ADMIN = 'broker_admin',
  BROKER_RM = 'broker_rm',
  BROKER_CREATOR = 'broker_creator',
  BROKER_APPROVER = 'broker_approver',
  BROKER_CREATOER_AND_APPROVER = 'broker_creator_and_approver',
  AGENT_ADMIN = 'agent_admin',
  AGENT_CREATOR = 'agent_creator',
  AGENT_CREATOR_AND_APPROVER = 'agent_creator_and_approver',
  BANCA_ADMIN = 'banca_admin',
  BANCA_RM = 'banca_rm',
  BANCA_CREATOR = 'banca_creator',
  BANCA_APPROVER = 'banca_approver',
  BANCA_CREATOER_AND_APPROVER = 'banca_creator_and_approver',
  SALES_CREATOR = 'sales_creator',
  SALES_APPROVER = 'sales_approver',
  SALES_CREATOR_AND_APPROVER = "sales_creator_and_approver",
  PLACEMENT_CREATOR = 'placement_creator',
  PLACEMENT_APPROVER = 'placement_approver',
  PLACEMENT_CREATOR_AND_APPROVER = "placement_creator_and_approver",

}

// // Base interface
// export interface IRole {
//   name: USER_ROLES;
// }

// // IDocument
// export interface IRoleDocument extends IRole, Document {}

// // IModel
// export interface IRoleModel extends Model<IRoleDocument> {
//   // getAdminRole: () => Promise<IRoleDocument>;
//   // getBrokerAdminRole: () => Promise<IRoleDocument>;
//   // getInsurerAdminRole: () => Promise<IRoleDocument>;
//   getByName: (role: string) => Promise<IRoleDocument>;
// }

// // Schema
// const RoleSchema = new Schema<IRoleDocument, IRoleModel>({
//   name: {
//     type: String,
//     required: [true, "A User Role must have a name"],
//     unique: true,
//     trim: true,
//     maxLength: [128, "A User Role name must have less than or equal to 128 characters."]
//   }
// });

// RoleSchema.plugin(diffHistory.plugin);

// // STATIC METHODS
// // RoleSchema.statics.getAdminRole = function () {
// //   return this.findOne({ name: USER_ROLES.ADMIN });
// // };

// // RoleSchema.statics.getBrokerAdminRole = function () {
// //   return this.findOne({ name: AllowedRoles.BROKER_ADMIN });
// // };

// // RoleSchema.statics.getInsurerAdminRole = function () {
// //   return this.findOne({ name: AllowedRoles.INSURER_ADMIN });
// // };

// RoleSchema.statics.getByName = function (role: USER_ROLES) {
//   return this.findOne({ name: role });
// };

// // Model
// export const Role = tenantUnawareModel<IRoleDocument, IRoleModel>("Role", RoleSchema);

// // Initialize the model once.
// Role();
