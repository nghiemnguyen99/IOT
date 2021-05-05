import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import User from "../users/user.entity";
@Entity()
class Customer extends User {
  @Column("text", { nullable: true })
  public sdt: string;

  @Column("text", { nullable: true })
  public firstname: string;
  @Column("text", { nullable: true })
  public lastname: string;
  @Column("int", { nullable: true })
  public sex: number;
  @Column("text", { nullable: true })
  public avatar: string;
}

export default Customer;
