import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_claimtype", { schema: "dow" })
export class MstClaimtype {
  @PrimaryGeneratedColumn({ type: "int", name: "claimtypeId" })
  claimtypeId: number;

  @Column("varchar", { name: "claimType", nullable: true, length: 45 })
  claimType: string | null;

  @Column("varchar", { name: "createdBy", nullable: true, length: 45 })
  createdBy: string | null;

  @Column("varchar", { name: "updatedBy", nullable: true, length: 45 })
  updatedBy: string | null;

  @Column("date", { name: "createdDate", nullable: true })
  createdDate: string | null;

  @Column("date", { name: "updatedDate", nullable: true })
  updatedDate: string | null;

  // @Column("varchar", { name: "dealerId", nullable: true, length: 45 })
  // dealerId: string | null;

  // @Column("varchar", { name: "accidentState", nullable: true })
  // accidentState: string | null;

  // @Column("varchar", { name: "accidentCity", nullable: true, length: 45 })
  // accidentCity: string | null;

  // @Column("varchar", { name: "claimantName", nullable: true })
  // claimantName: string | null;

  // @Column("date", { name: "claimIntimationToIcDate", nullable: true })
  // claimIntimationToIcDate: string | null;

  // @Column("varchar", { name: "vehicleReg", nullable: true })
  // vehicleReg: string | null;

  // @Column("varchar", { name: "investigatorName", nullable: true, length: 45 })
  // investigatorName: string | null;

  // @Column("varchar", { name: "investigatorContact", nullable: true, length: 45 })
  // investigatorContact: string | null;

  // @Column("date", { name: "settlementDate", nullable: true })
  // settlementDate: string | null;

  // @Column("varchar", { name: "settlementAmount", nullable: true, length: 45 })
  // settlementAmount: string | null;

  // @Column("varchar", { name: "remark", nullable: true, length: 45 })
  // remark: string | null;

  // @Column("varchar", { name: "policyId", nullable: true, length: 45 })
  // policyId: string | null;
  
}