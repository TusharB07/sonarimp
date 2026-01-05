import { QmsCountrymasters } from "src/masters/countries/entity/QmsCountrymasters";
import { QmsPartners } from "src/masters/partners/entity/QmsPartners";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_statemasters", { schema: "tata_qms" })
export class QmsStatemasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  // @Column("int", { name: "countryId", nullable: true })
  // countryId: number | null;

  @Column("text", { name: "stateCode", nullable: true })
  stateCode: string | null;

  @ManyToOne(() => QmsCountrymasters, countryId => countryId.id, { eager: true })
  @JoinColumn({ name: "countryId" })
  countryId: QmsCountrymasters;


  @OneToMany(() => QmsPartners, (partner) => partner.stateId)
  partners: QmsPartners[];
  
}