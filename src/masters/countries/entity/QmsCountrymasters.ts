import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_countrymasters", { schema: "tata_qms" })
export class QmsCountrymasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;
}
