import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qms_branchmasters", { schema: "tata_qms" })
export class QmsBranchmasters {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "active", nullable: true })
  active: string | null;

  @Column("text", { name: "partnerId", nullable: true })
  partnerId: string | null;

  @Column("text", { name: "zone", nullable: true })
  zone: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("int", { name: "code", nullable: true })
  code: number | null;

  @Column("text", { name: "tenantId", nullable: true })
  tenantId: string | null;
}
