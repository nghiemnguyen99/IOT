import User from "../users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Driver extends User {
  @Column("text", { nullable: true })
  public phone: string;

  @Column("text", { nullable: true })
  public avatar: string;

  @Column("text", { nullable: true })
  public bikenumber: string;
  @Column("text", { nullable: true })
  public inforbike: string;
  @Column("text", { nullable: true })
  public status: string;
  @Column("text", { nullable: true })
  public active_time: string;
}

export default Driver;
