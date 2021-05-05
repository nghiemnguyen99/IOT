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
  public firstname: string;
  @Column("text", { nullable: true })
  public lastname: string;

  @Column("text", { nullable: true })
  public email: string;

  @Column("text", { nullable: true })
  public password: string;
}

export default UserBase;
