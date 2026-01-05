import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_sectormasters", { schema: "tata_qms" })
export class QmsSectormasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "isActive", nullable: true })
  isActive: string | null;
}
