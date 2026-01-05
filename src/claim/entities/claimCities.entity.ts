import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_cities", { schema: "dow" })
export class MstAccidentCities{
    @PrimaryGeneratedColumn({ type: "int", name: "cityId" })
    cityId: number;

    @Column("int", { name: "stateId", nullable: true })
    stateId: number | null;
  
    @Column("varchar", { name: "cityName", nullable: true, length: 100 })
    cityName: string;
}