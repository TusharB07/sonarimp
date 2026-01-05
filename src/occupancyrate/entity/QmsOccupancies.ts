import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_occupancies", { schema: "tata_qms" })
export class QmsOccupancies {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "occupancyType", nullable: true })
  occupancyType: string | null;

  @Column("text", { name: "gradedRetention", nullable: true })
  gradedRetention: string | null;

  @Column("text", { name: "tacCode", nullable: true })
  tacCode: string | null;

  @Column("double", { name: "stfiRate", nullable: true, precision: 22 })
  stfiRate: number | null;

  @Column("text", { name: "section", nullable: true })
  section: string | null;

  @Column("int", { name: "riskCode", nullable: true })
  riskCode: number | null;

  @Column("int", { name: "rateCode", nullable: true })
  rateCode: number | null;

  @Column("text", { name: "policyType", nullable: true })
  policyType: string | null;

  @Column("text", { name: "specialRemark", nullable: true })
  specialRemark: string | null;

  @Column("text", { name: "specialExcessGIC", nullable: true })
  specialExcessGic: string | null;

  @Column("text", { name: "iibOccupancyCode", nullable: true })
  iibOccupancyCode: string | null;

  @Column("double", { name: "flexaiib", nullable: true, precision: 22 })
  flexaiib: number | null;

  @Column("text", { name: "hazardCategoryId", nullable: true })
  hazardCategoryId: string | null;

  @Column("text", { name: "industryTypeId", nullable: true })
  industryTypeId: string | null;

  @Column("int", { name: "partnerId", nullable: true })
  partnerId: number | null;

  @Column("int", { name: "productId", nullable: true })
  productId: number | null;

  @Column("text", { name: "tenantId", nullable: true })
  tenantId: string | null;

  @Column("text", { name: "identity", nullable: true })
  identity: string | null;

  @Column("text", { name: "applicableFrom", nullable: true })
  applicableFrom: string | null;

  @Column("text", { name: "applicableTo", nullable: true })
  applicableTo: string | null;

  @Column("text", { name: "active", nullable: true })
  active: string | null;

  @Column("text", { name: "effectiveFrom", nullable: true })
  effectiveFrom: string | null;

  @Column("text", { name: "effectiveTo", nullable: true })
  effectiveTo: string | null;

  @Column("text", { name: "flexaiibc", nullable: true })
  flexaiibc: string | null;

  @Column("text", { name: "maxnumberOfYears", nullable: true })
  maxnumberOfYears: string | null;

  @Column("text", { name: "minnumberOfYears", nullable: true })
  minnumberOfYears: string | null;

  @Column("text", { name: "maxStockSI", nullable: true })
  maxStockSi: string | null;

  @Column("text", { name: "tenurewisestfiRate", nullable: true })
  tenurewisestfiRate: string | null;

  @Column("text", { name: "tenurewiseflexaiibc", nullable: true })
  tenurewiseflexaiibc: string | null;

  @Column("text", { name: "tenurewiseflexaiib", nullable: true })
  tenurewiseflexaiib: string | null;

  @Column("text", { name: "buildingFlexaiib", nullable: true })
  buildingFlexaiib: string | null;

  @Column("text", { name: "buildingStfiRate", nullable: true })
  buildingStfiRate: string | null;

  @Column("text", { name: "buildingFlexaiibc", nullable: true })
  buildingFlexaiibc: string | null;

  @Column("text", { name: "buildingTenurewiseflexaiib", nullable: true })
  buildingTenurewiseflexaiib: string | null;

  @Column("text", { name: "buildingTenurewisestfiRate", nullable: true })
  buildingTenurewisestfiRate: string | null;

  @Column("text", { name: "buildingTenurewiseflexaiibc", nullable: true })
  buildingTenurewiseflexaiibc: string | null;

  @Column("text", { name: "contentFlexaiib", nullable: true })
  contentFlexaiib: string | null;

  @Column("text", { name: "contentStfiRate", nullable: true })
  contentStfiRate: string | null;

  @Column("text", { name: "contentFlexaiibc", nullable: true })
  contentFlexaiibc: string | null;

  @Column("text", { name: "contentTenurewiseFlexaiib", nullable: true })
  contentTenurewiseFlexaiib: string | null;

  @Column("text", { name: "contentTenurewiseStfiRate", nullable: true })
  contentTenurewiseStfiRate: string | null;

  @Column("text", { name: "contentTenurewiseFlexaiibc", nullable: true })
  contentTenurewiseFlexaiibc: string | null;

  @Column("text", { name: "opt1Rate", nullable: true })
  opt1Rate: string | null;

  @Column("text", { name: "opt2Rate", nullable: true })
  opt2Rate: string | null;

  @Column("text", { name: "opt3Rate", nullable: true })
  opt3Rate: string | null;

  @Column("text", { name: "opt4Rate", nullable: true })
  opt4Rate: string | null;

  @Column("text", { name: "taskStatus", nullable: true })
  taskStatus: string | null;
}
