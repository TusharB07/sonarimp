
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("claimId_idx", ["claimid"], {})
@Index("documentTypeId_idx", ["documentTypeId"], {})
@Entity("dow_claimdocuments", { schema: "dow" })
export class DowClaimdocuments {
  @PrimaryGeneratedColumn({ type: "int", name: "claimdocumentId" })
  claimdocumentId: number;

  @Column("int", { name: "claimid" })
  claimid: number;

  @Column("varchar", { name: "documentName", nullable: true, length: 45 })
  documentName: string | null;

  @Column("int", { name: "documentTypeId", nullable: true })
  documentTypeId: number | null;

  @Column("varchar", { name: "description", nullable: true, length: 45 })
  description: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 45 })
  status: string | null;

  

}
