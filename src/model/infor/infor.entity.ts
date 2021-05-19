import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
class Infor {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public deviceid: string;
  @Column("text", { nullable: true })
  public doam: string;

  @Column("text", { nullable: true })
  public nhietdo: string;

  @Column("text", { nullable: true })
  public time: string;
}

export default Infor;
