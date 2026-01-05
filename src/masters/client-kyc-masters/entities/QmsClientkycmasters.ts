import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_clientkycmasters", { schema: "tata_qms" })
export class QmsClientkycmasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "clientGroupName", nullable: true })
  clientGroupName: string | null;

  @Column("text", { name: "clientName", nullable: true })
  clientName: string | null;

  @Column("text", { name: "pan", nullable: true })
  pan: string | null;

  @Column("text", { name: "gst", nullable: true })
  gst: string | null;
}
