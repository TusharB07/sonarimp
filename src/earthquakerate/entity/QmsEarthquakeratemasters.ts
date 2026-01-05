import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_earthquakeratemasters", { schema: "tata_qms" })
export class QmsEarthquakeratemasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "zone", nullable: true })
  zone: string | null;

  @Column("double", { name: "rate", nullable: true, precision: 22 })
  rate: number | null;

  @Column("text", { name: "applicableFrom", nullable: true })
  applicableFrom: string | null;

  @Column("text", { name: "applicableTo", nullable: true })
  applicableTo: string | null;

  @Column("int", { name: "industryTypeId", nullable: true })
  industryTypeId: number | null;

  @Column("int", { name: "partnerId", nullable: true })
  partnerId: number | null;

  @Column("text", { name: "tenantId", nullable: true })
  tenantId: string | null;

  @Column("int", { name: "productId", nullable: true })
  productId: number | null;

  @Column("text", { name: "identity", nullable: true })
  identity: string | null;

  @Column("text", { name: "buildingRate", nullable: true })
  buildingRate: string | null;

  @Column("text", { name: "buildingTenurewiseRate", nullable: true })
  buildingTenurewiseRate: string | null;

  @Column("text", { name: "contentRate", nullable: true })
  contentRate: string | null;

  @Column("text", { name: "contentTenurewiseRate", nullable: true })
  contentTenurewiseRate: string | null;

  @Column("text", { name: "occupancyId", nullable: true })
  occupancyId: string | null;

  @Column("text", { name: "tenurewiseRate", nullable: true })
  tenurewiseRate: string | null;

  @Column("text", { name: "taskStatus", nullable: true })
  taskStatus: string | null;
}
