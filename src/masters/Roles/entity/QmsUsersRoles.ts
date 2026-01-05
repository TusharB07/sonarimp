import { QmsUsers } from "src/masters/user/entity/QmsUsers";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("qms_users_roles", { schema: "tata_qms" })
export class QmsUsersRoles {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @OneToMany(() => QmsUsers, (user) => user.roleId)
  users: QmsUsers[];
  
}
