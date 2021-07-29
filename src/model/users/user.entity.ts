import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
class UserBase {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public username: string;
  @Column("text", { nullable: true })
  public password: string;

  @Column("text", { nullable: true })
  public role: string;

  @Column("text", { nullable: true })
  public address: string;

  @Column("text")
  public deviceid: string;
}

export default UserBase;
