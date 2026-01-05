import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_hazardcategorymasters", { schema: "tata_qms" })
export class QmsHazardcategorymasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "category", nullable: true })
  category: string | null;

  @Column("int", { name: "score", nullable: true })
  score: number | null;

  @Column("text", { name: "status", nullable: true })
  status: string | null;
}
