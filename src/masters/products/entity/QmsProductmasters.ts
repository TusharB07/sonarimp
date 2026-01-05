import { QmsAddoncovers } from "src/masters/addoncovers/entity/QmsAddoncovers";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_productmasters", { schema: "tata_qms" })
export class QmsProductmasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "type", nullable: true })
  type: string | null;

  @Column("text", { name: "category", nullable: true })
  category: string | null;

  @Column("text", { name: "status", nullable: true })
  status: string | null;

  @Column("text", { name: "shortName", nullable: true })
  shortName: string | null;

  @Column("text", { name: "productTemplate", nullable: true })
  productTemplate: string | null;

  @Column("int", { name: "categoryId", nullable: true })
  categoryId: number | null;

  @Column("text", { name: "isFlexaShow", nullable: true })
  isFlexaShow: string | null;

  @Column("text", { name: "isOccupancySubTypeShow", nullable: true })
  isOccupancySubTypeShow: string | null;

  @Column("text", { name: "is_validation_check", nullable: true })
  isValidationCheck: string | null;

  @Column("text", { name: "isEarthQuake", nullable: true })
  isEarthQuake: string | null;

  @Column("text", { name: "isFire", nullable: true })
  isFire: string | null;

  @Column("text", { name: "isSTFI", nullable: true })
  isStfi: string | null;

  @Column("text", { name: "isTerrorism", nullable: true })
  isTerrorism: string | null;

  @Column("text", {
    name: "renewalPolicyPeriodinMonthsoryears",
    nullable: true,
  })
  renewalPolicyPeriodinMonthsoryears: string | null;

  @Column("text", { name: "isEarthQuakeRequired", nullable: true })
  isEarthQuakeRequired: string | null;

  @Column("text", { name: "isFireRequired", nullable: true })
  isFireRequired: string | null;

  @Column("text", { name: "isOccupancyWiseRate", nullable: true })
  isOccupancyWiseRate: string | null;

  @Column("text", { name: "isOccupancywiseTenure", nullable: true })
  isOccupancywiseTenure: string | null;

  @Column("text", { name: "isSTFIRequired", nullable: true })
  isStfiRequired: string | null;

  @Column("text", { name: "isTerrorismRequired", nullable: true })
  isTerrorismRequired: string | null;

  @Column("int", { name: "numberOfYears", nullable: true })
  numberOfYears: number | null;

  @Column("text", { name: "isBuildingAndContentWiseRate", nullable: true })
  isBuildingAndContentWiseRate: string | null;

  @Column("text", { name: "isSubOccupancyWiseRate", nullable: true })
  isSubOccupancyWiseRate: string | null;

  @Column("int", { name: "numberOfMonths", nullable: true })
  numberOfMonths: number | null;

  @Column("text", { name: "bscCovers[0]", nullable: true })
  bscCovers_0: string | null;

  @Column("text", { name: "bscCovers[1]", nullable: true })
  bscCovers_1: string | null;

  @Column("text", { name: "bscCovers[2]", nullable: true })
  bscCovers_2: string | null;

  @Column("text", { name: "bscCovers[3]", nullable: true })
  bscCovers_3: string | null;

  @Column("text", { name: "bscCovers[4]", nullable: true })
  bscCovers_4: string | null;

  @Column("text", { name: "bscCovers[5]", nullable: true })
  bscCovers_5: string | null;

  @Column("text", { name: "bscCovers[6]", nullable: true })
  bscCovers_6: string | null;

  @Column("text", { name: "bscCovers[7]", nullable: true })
  bscCovers_7: string | null;

  @Column("text", { name: "bscCovers[8]", nullable: true })
  bscCovers_8: string | null;

  @Column("text", { name: "bscCovers[9]", nullable: true })
  bscCovers_9: string | null;

  @Column("text", { name: "bscCovers[10]", nullable: true })
  bscCovers_10: string | null;

  @Column("text", { name: "bscCovers[11]", nullable: true })
  bscCovers_11: string | null;

  @Column("text", { name: "bscCovers[12]", nullable: true })
  bscCovers_12: string | null;

  @Column("text", { name: "isOtc", nullable: true })
  isOtc: string | null;

  @Column("text", { name: "mandatoryCovers[0]", nullable: true })
  mandatoryCovers_0: string | null;

  @Column("text", { name: "mandatoryCovers[1]", nullable: true })
  mandatoryCovers_1: string | null;

  @Column("text", { name: "mandatoryCovers[2]", nullable: true })
  mandatoryCovers_2: string | null;

  @Column("text", { name: "bscCovers", nullable: true })
  bscCovers: string | null;

  @Column("text", { name: "mandatoryCovers", nullable: true })
  mandatoryCovers: string | null;

  @OneToMany(() => QmsAddoncovers, (addoncover) => addoncover.productId)
  addoncovers: QmsAddoncovers[];

  
}
