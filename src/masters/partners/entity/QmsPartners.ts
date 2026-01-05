
import { QmsCitymasters } from "src/masters/city/entity/QmsCitymasters";
import { QmsCountrymasters } from "src/masters/countries/entity/QmsCountrymasters";
import { QmsStatemasters } from "src/masters/states/enitity/QmsStatemasters";
import { QmsUsers } from "src/masters/user/entity/QmsUsers";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_partners", { schema: "tata_qms" })
export class QmsPartners {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "partnerType", nullable: true })
  partnerType: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "shortName", nullable: true })
  shortName: string | null;

  @Column("text", { name: "address", nullable: true })
  address: string | null;

  @Column("text", { name: "pan", nullable: true })
  pan: string | null;

  @Column("text", { name: "gstin", nullable: true })
  gstin: string | null;

  @Column("text", { name: "cin", nullable: true })
  cin: string | null;

  @Column("text", { name: "contactPerson", nullable: true })
  contactPerson: string | null;

  @Column("text", { name: "designation", nullable: true })
  designation: string | null;

  @Column("bigint", { name: "mobileNumber", nullable: true })
  mobileNumber: string | null;

  // @Column("int", { name: "countryId", nullable: true })
  // countryId: string | null;

  @Column("text", { name: "districtId", nullable: true })
  districtId: string | null;

  // @Column("text", { name: "cityId", nullable: true })
  // cityId: string | null;

  @Column("text", { name: "pincodeId", nullable: true })
  pincodeId: string | null;

  @Column("text", { name: "status", nullable: true })
  status: string | null;

  @Column("text", { name: "agentCode", nullable: true })
  agentCode: string | null;

  @Column("text", { name: "brokerModeStatus", nullable: true })
  brokerModeStatus: string | null;

  @Column("text", { name: "concurrentSesssion", nullable: true })
  concurrentSesssion: string | null;

  @Column("text", { name: "isAutoAssignActive", nullable: true })
  isAutoAssignActive: string | null;

  @Column("text", { name: "locationCount", nullable: true })
  locationCount: string | null;

  @Column("text", { name: "logo", nullable: true })
  logo: string | null;

  @Column("text", { name: "vendorCode", nullable: true })
  vendorCode: string | null;

  @Column("text", { name: "vendorName", nullable: true })
  vendorName: string | null;

  @Column("text", { name: "brokerAutoFlowStatus", nullable: true })
  brokerAutoFlowStatus: string | null;

  @Column("text", { name: "mappedIcNames[0]._id", nullable: true })
  mappedIcNames_0Id: string | null;

  @Column("text", { name: "mappedIcNames[1]._id", nullable: true })
  mappedIcNames_1Id: string | null;

  @Column("text", { name: "mappedIcNames[2]._id", nullable: true })
  mappedIcNames_2Id: string | null;

  @Column("text", { name: "mappedIcNames[3]._id", nullable: true })
  mappedIcNames_3Id: string | null;

  @Column("text", { name: "mappedIcNames[0].icPartnerId", nullable: true })
  mappedIcNames_0IcPartnerId: string | null;

  @Column("text", { name: "mappedIcNames[1].icPartnerId", nullable: true })
  mappedIcNames_1IcPartnerId: string | null;

  @Column("text", { name: "mappedIcNames[2].icPartnerId", nullable: true })
  mappedIcNames_2IcPartnerId: string | null;

  @Column("text", { name: "mappedIcNames[3].icPartnerId", nullable: true })
  mappedIcNames_3IcPartnerId: string | null;

  @Column("text", { name: "underwriterMappingFlag", nullable: true })
  underwriterMappingFlag: string | null;

  @Column("text", { name: "isBrokerMappedFromMaster", nullable: true })
  isBrokerMappedFromMaster: string | null;

  @Column("text", { name: "isRate", nullable: true })
  isRate: string | null;

  @Column("text", { name: "isRiskInspection", nullable: true })
  isRiskInspection: string | null;

  @ManyToOne(() => QmsStatemasters, (state) => state.partners, { eager: true })
  @JoinColumn({ name: "stateId" })
  stateId: QmsStatemasters;  

  @ManyToOne(() => QmsCountrymasters, country => country.id, { eager: true })
  @JoinColumn({ name: "countryId" })
  countryId: QmsCountrymasters;

  @ManyToOne(() => QmsCitymasters, city => city.id, { eager: true })
  @JoinColumn({ name: "cityId" })
  cityId: QmsCitymasters;

  @OneToMany(() => QmsUsers, (user) => user.partnerId)
  users: QmsUsers[];

}