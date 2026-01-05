import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_state", { schema: "dow" })
export class MstAccidentStates{
    @PrimaryGeneratedColumn({ type: "int", name: "stateId" })
    stateId: number;
  
    @Column("varchar", { name: "stateName", nullable: true, length: 100 })
    stateName: string;
}
