import { QmsStatemasters } from "src/masters/states/enitity/QmsStatemasters";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_citymasters", { schema: "tata_qms" })
export class QmsCitymasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  // @Column("int", { name: "stateId", nullable: true })
  // stateId: number | null;

  @ManyToOne(() => QmsStatemasters, states => states.id, { eager: true })
  @JoinColumn({ name: "stateId" })
  stateId: QmsStatemasters;
}
