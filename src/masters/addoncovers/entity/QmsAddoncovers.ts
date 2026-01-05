
import { QmsPartners } from "src/masters/partners/entity/QmsPartners";
import { QmsProductmasters } from "src/masters/products/entity/QmsProductmasters";
import { QmsSectormasters } from "src/masters/sectors/entity/QmsSectormasters";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_addoncovers", { schema: "tata_qms" })
export class QmsAddoncovers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "isFree", nullable: true })
  isFree: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "category", nullable: true })
  category: string | null;

  // @Column("int", { name: "partnerId", nullable: true })
  // partnerId: number | null;

  @Column("double", { name: "rate", nullable: true, precision: 22 })
  rate: number | null;

  @Column("text", { name: "addonTypeFlag", nullable: true })
  addonTypeFlag: string | null;

  @Column("text", { name: "categoryOfImportance", nullable: true })
  categoryOfImportance: string | null;

  @Column("text", { name: "rateType", nullable: true })
  rateType: string | null;

  @Column("text", { name: "freeUpToText", nullable: true })
  freeUpToText: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "freeUpToNumber", nullable: true })
  freeUpToNumber: string | null;

  // @Column("int", { name: "productId", nullable: true })
  // productId: number | null;

  @Column("text", { name: "applicableTo", nullable: true })
  applicableTo: string | null;

  @Column("text", { name: "applicableFrom", nullable: true })
  applicableFrom: string | null;

  // @Column("text", { name: "sectorId", nullable: true })
  // sectorId: string | null;

  @Column("text", { name: "isAbv100cr", nullable: true })
  isAbv100cr: string | null;

  @Column("text", { name: "tenantId", nullable: true })
  tenantId: string | null;

  @Column("text", { name: "identity", nullable: true })
  identity: string | null;

  @Column("text", { name: "taskStatus", nullable: true })
  taskStatus: string | null;

  @Column("int", { name: "__v", nullable: true })
  v: number | null;

  @Column("text", { name: "occupancyId", nullable: true })
  occupancyId: string | null;


    @ManyToOne(() => QmsPartners, (partner) => partner.id, { eager: true }) 
    @JoinColumn({ name: "partnerId" }) 
    partnerId: QmsPartners;

    @ManyToOne(() => QmsSectormasters, (sector) => sector.id, { eager: true }) 
    @JoinColumn({ name: "sectorId" }) 
    sectorId: QmsSectormasters;

    @ManyToOne(() => QmsProductmasters, (product) => product.id, { eager: true }) 
    @JoinColumn({ name: "productId" }) 
    productId: QmsProductmasters;
}
