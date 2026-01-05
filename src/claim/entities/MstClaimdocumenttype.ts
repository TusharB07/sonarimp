import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_claimdocumenttype", { schema: "dow_new" })
export class MstClaimdocumenttype {
  @PrimaryGeneratedColumn({ type: "int", name: "claimDocumentTypeId" })
  claimDocumentTypeId: number;

  @Column("varchar", { name: "productType", nullable: true, length: 45 })
  productType: string | null;

  @Column("int", { name: "coverageTypeId", nullable: true })
  coverageTypeId: number | null;

  @Column("int", { name: "isManditory", nullable: true })
  isManditory: number | null;

  @Column("varchar", { name: "documentType", nullable: true, length: 45 })
  documentType: string | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;
}
