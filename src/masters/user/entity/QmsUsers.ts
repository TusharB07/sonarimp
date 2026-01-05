import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { QmsUsersRoles } from "src/masters/Roles/entity/QmsUsersRoles";
import { QmsPartners } from "src/masters/partners/entity/QmsPartners";


@Index("mobileNumber", ["mobileNumber"], { unique: true })
@Index("email", ["email"], { unique: true })
@Index("userEmail", ["userEmail"], { unique: true })
@Index("email_idx", ["email"], { unique: true })
@Index("mobileNumber_idx", ["mobileNumber"], { unique: true })
@Index("userEmail_idx", ["userEmail"], { unique: true })
@Index("email_partnerId_idx", ["email", "partnerId"], {})
@Entity("qms_users", { schema: "tata_qms" })
export class QmsUsers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "photo",
    nullable: true,
    length: 255,
    default: () => "'default.jpg'",
  })
  photo: string | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  active: boolean | null;

  @Column("tinyint", {
    name: "configSidebarIsOpen",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  configSidebarIsOpen: boolean | null;

  @Column("enum", {
    name: "configMenuType",
    nullable: true,
    enum: ["horizontal", "vertical"],
    default: () => "'horizontal'",
  })
  configMenuType: "horizontal" | "vertical" | null;

  @Column("enum", {
    name: "configColorScheme",
    nullable: true,
    enum: ["light", "dark"],
    default: () => "'light'",
  })
  configColorScheme: "light" | "dark" | null;

  @Column("tinyint", {
    name: "configRippleEffect",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  configRippleEffect: boolean | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", {
    name: "mobileNumber",
    nullable: true,
    unique: true,
    length: 20,
  })
  mobileNumber: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  // @Column("varchar", { name: "roleId", nullable: true, length: 24 })
  // roleId: string | null;

  // @Column("varchar", { name: "partnerId", nullable: true, length: 24 })
  // partnerId: string | null;

  @Column("varchar", { name: "tenantId", nullable: true, length: 255 })
  tenantId: string | null;

  @Column("int", { name: "version", nullable: true, default: () => "'0'" })
  version: number | null;

  @Column("datetime", { name: "passwordChangedAt", nullable: true })
  passwordChangedAt: Date | null;

  @Column("int", { name: "age", nullable: true })
  age: number | null;

  @Column("int", { name: "underWriterLevel", nullable: true })
  underWriterLevel: number | null;

  @Column("int", { name: "attemptCount", nullable: true, default: () => "'0'" })
  attemptCount: number | null;

  @Column("tinyint", {
    name: "isLocked",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isLocked: boolean | null;

  @Column("int", { name: "otp", nullable: true })
  otp: number | null;

  @Column("datetime", { name: "otpExpiresAt", nullable: true })
  otpExpiresAt: Date | null;

  @Column("varchar", { name: "passwordConfirm", nullable: true, length: 255 })
  passwordConfirm: string | null;

  @Column("datetime", { name: "passwordExpiresAt", nullable: true })
  passwordExpiresAt: Date | null;

  @Column("varchar", {
    name: "userEmail",
    nullable: true,
    unique: true,
    length: 255,
  })
  userEmail: string | null;
  @ManyToOne(() => QmsUsersRoles, (role) => role.users, { eager: true }) 
  @JoinColumn({ name: "roleId" }) // Maps to roleId column
  roleId: QmsUsersRoles;

  @ManyToOne(() => QmsPartners, (partner) => partner.users, { eager: true }) 
  @JoinColumn({ name: "partnerId" }) 
  partnerId: QmsPartners;


  async correctPassword(enteredPassword: string): Promise<boolean> {
    if (!this.password) return false; // Ensure password exists
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
