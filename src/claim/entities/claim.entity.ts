import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
//   import { DowClaimdocuments } from "./DowClaimdocuments";
//   import { MstClaimtype } from "./MstClaimtype";
//   import { MstIc } from "./MstIc";
 
@Entity("dow_claims", { schema: "dow" })
export class DowClaims {
  @PrimaryGeneratedColumn({ type: "int", name: "claimId" })
  claimId: number;

  @Column("varchar", { name: "chassisNo", nullable: true, length: 45 })
  chassisNo: string;

  @Column("varchar", { name: "vehicleRegisterNo", nullable: true, length: 45 })
  vehicleRegisterNo: string | null;

  @Column("varchar", { name: "customerId", nullable: true, length: 45 })
  customerId: string | null;

  @Column("int", { name: "icId", nullable: true })
  icId: number | null;

  @Column("datetime", { name: "lossDate", nullable: true })
  lossDate: Date | null;

  @Column("time", { name: "lostTime", nullable: true })
  lostTime: Date | null;

  @Column("varchar", { name: "intimatedBy", nullable: true, length: 45 })
  intimatedBy: string | null;

  @Column("varchar", { name: "intimatedThrough", nullable: true, length: 45 })
  intimatedThrough: string | null;

  @Column("int", { name: "claimTypeId", nullable: true })
  claimTypeId: number | null;

  @Column("varchar", { name: "driverName", nullable: true, length: 45 })
  driverName: string | null;

  @Column("varchar", { name: "statusId", nullable: true, length: 45 })
  statusId: string | null;

  @Column("varchar", { name: "createdBy", nullable: true, length: 45 })
  createdBy: string | null;

  @Column("datetime", { name: "createdDate", nullable: true })
  createdDate: Date | null;

  @Column("varchar", { name: "updatedBy", nullable: true, length: 45 })
  updatedBy: string | null;

  @Column("datetime", { name: "updatedDate", nullable: true })
  updatedDate: Date | null;

  @Column("varchar", { name: "dealerId", nullable: true, length: 45 })
  dealerId: string | null;

  @Column("varchar", { name: "accidentState", nullable: true, length: 45 })
  accidentState: string | null;

  @Column("varchar", { name: "accidentCity", nullable: true, length: 45 })
  accidentCity: string | null;

  @Column("varchar", { name: "claimantName", nullable: true, length: 45 })
  claimantName: string | null;

  @Column("date", { name: "claimIntimationToICDate", nullable: true })
  claimIntimationToIcDate: string | null;

  @Column("varchar", { name: "vehicleReg", nullable: true, length: 45 })
  vehicleReg: string | null;

  @Column("varchar", { name: "investigatorName", nullable: true, length: 45 })
  investigatorName: string | null;

  @Column("varchar", {
    name: "investigatorContact",
    nullable: true,
    length: 45,
  })
  investigatorContact: string | null;

  @Column("date", { name: "settlementDate", nullable: true })
  settlementDate: string | null;

  @Column("varchar", { name: "settlementAmount", nullable: true, length: 45 })
  settlementAmount: string | null;

  @Column("varchar", { name: "remark", nullable: true, length: 45 })
  remark: string | null;

  @Column("varchar", { name: "custName", nullable: true, length: 500 })
  custName: string | null;
  @Column("varchar", { name: "custContact", nullable: true, length: 45 })
  custContact: string | null;
  @Column("varchar", { name: "custEmail", nullable: true, length: 100 })
  custEmail: string | null;

  @Column("int", { name: "isSendToBroker", nullable: true })
  isSendToBroker: number | null;

  @Column("varchar", { name: "icClaimNumber", nullable: true, length: 45 })
  icClaimNumber: string;

  @Column("varchar", { name: "tmibaslClaimNumber", nullable: true, length: 45 })
  tmibaslClaimNumber: string;

  @Column("int", { name: "pincode", nullable: true })
  pincode: number | null;

}
  