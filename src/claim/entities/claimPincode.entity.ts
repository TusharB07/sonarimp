import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_pincode", { schema: "dow" })
export class MstPincode{
    @PrimaryGeneratedColumn({ type: "int", name: "pincodeId" })
    pincodeId: number;

    @Column("int", { name: "cityId", nullable: true })
    cityId: number | null;
  
    @Column("varchar", { name: "pincode", nullable: true, length: 45 })
    pincode: string;
}