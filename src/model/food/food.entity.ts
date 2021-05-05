import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import Store from "../store/store.entity";
@Entity()
class Food {
  @PrimaryGeneratedColumn("uuid") id: string;

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
  @ManyToOne(() => Store, (author: Store) => author.id)
  public storeid: Store;
}

export default Food;
