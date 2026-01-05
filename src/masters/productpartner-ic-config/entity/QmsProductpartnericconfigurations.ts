import { QmsProductmasters } from "src/masters/products/entity/QmsProductmasters";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_productpartnericconfigurations", { schema: "tata_qms" })
export class QmsProductpartnericconfigurations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "active", nullable: true })
  active: string | null;

  // @Column("int", { name: "productId", nullable: true })
  // productId: number | null;

  @Column("text", { name: "brokerPartnerId", nullable: true })
  brokerPartnerId: string | null;

  @Column("text", { name: "insurerPartnerId", nullable: true })
  insurerPartnerId: string | null;

  @Column("text", { name: "otcType", nullable: true })
  otcType: string | null;

  @Column("int", { name: "fromSI", nullable: true })
  fromSi: number | null;

  @Column("double", { name: "toSI", nullable: true, precision: 22 })
  toSi: number | null;

  @Column("int", { name: "discountRules.discountFrom", nullable: true })
  discountRulesDiscountFrom: number | null;

  @Column("int", { name: "discountRules.discountTo", nullable: true })
  discountRulesDiscountTo: number | null;

  @Column("text", { name: "discountRules.isNstp", nullable: true })
  discountRulesIsNstp: string | null;

  @Column("int", { name: "discountRules.NstpMaxDiscount", nullable: true })
  discountRulesNstpMaxDiscount: number | null;

  @Column("text", { name: "bscCoverRules[0]._id", nullable: true })
  bscCoverRules_0Id: string | null;

  @Column("text", { name: "bscCoverRules[1]._id", nullable: true })
  bscCoverRules_1Id: string | null;

  @Column("text", { name: "bscCoverRules[0].isAllowed", nullable: true })
  bscCoverRules_0IsAllowed: string | null;

  @Column("text", { name: "bscCoverRules[1].isAllowed", nullable: true })
  bscCoverRules_1IsAllowed: string | null;

  @Column("text", { name: "bscCoverRules[0].name", nullable: true })
  bscCoverRules_0Name: string | null;

  @Column("text", { name: "bscCoverRules[1].name", nullable: true })
  bscCoverRules_1Name: string | null;

  @Column("text", { name: "lovRules[0]._id", nullable: true })
  lovRules_0Id: string | null;

  @Column("text", { name: "lovRules[0].name", nullable: true })
  lovRules_0Name: string | null;

  @Column("text", { name: "lovRules[0].isAllowed", nullable: true })
  lovRules_0IsAllowed: string | null;

  @Column("text", { name: "lovRules[0].lovId", nullable: true })
  lovRules_0LovId: string | null;

  @Column("text", { name: "validateSI", nullable: true })
  validateSi: string | null;

  @Column("int", { name: "wcConfigurationDiscount", nullable: true })
  wcConfigurationDiscount: number | null;

  @Column("text", { name: "taskStatus", nullable: true })
  taskStatus: string | null;

  @ManyToOne(() => QmsProductmasters, product => product.id, { eager: true })
  @JoinColumn({ name: "productId" })
  productId: QmsProductmasters;
}
