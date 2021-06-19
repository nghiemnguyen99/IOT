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

  @Column("text")
  public deviceid: string;

  @Column("text", { nullable: true })
  public doamdat: string;
  @Column("text", { nullable: true })
  public doamkk: string;
  @Column("text", { nullable: true })
  public nhietdokk: string;
  @Column("text", { nullable: true })
  public den: string;

  @Column("text", { nullable: true })
  public maybom: string;

  @Column("text", { nullable: true })
  public time: string;
}

export default Infor;
