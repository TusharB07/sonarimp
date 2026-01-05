import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_terrorismratemasters", { schema: "tata_qms" })
export class QmsTerrorismratemasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "industryTypeId", nullable: true })
  industryTypeId: number | null;

  @Column("int", { name: "partnerId", nullable: true })
  partnerId: number | null;

  @Column("text", { name: "tenantId", nullable: true })
  tenantId: string | null;

  @Column("int", { name: "productId", nullable: true })
  productId: number | null;

  @Column("text", { name: "fromSI", nullable: true })
  fromSi: string | null;

  @Column("text", { name: "toSI", nullable: true })
  toSi: string | null;

  @Column("double", { name: "ratePerMile", nullable: true, precision: 22 })
  ratePerMile: number | null;

  @Column("text", { name: "addValue", nullable: true })
  addValue: string | null;

  @Column("text", { name: "remark", nullable: true })
  remark: string | null;

  @Column("text", { name: "applicableFrom", nullable: true })
  applicableFrom: string | null;

  @Column("text", { name: "applicableTo", nullable: true })
  applicableTo: string | null;

  @Column("text", { name: "identity", nullable: true })
  identity: string | null;

  @Column("text", { name: "taskStatus", nullable: true })
  taskStatus: string | null; 
}
