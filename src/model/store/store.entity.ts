import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import User from "../users/user.entity";
import Food from "../food/food.entity";
@Entity()
class Store {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public sdt: string;
  @Column("text", { nullable: true })
  public email: string;
  @Column("text", { nullable: true })
  public password: string;
  @Column("text", { nullable: true })
  public diachi: string;
  @Column("text", { nullable: true })
  public longitude: string;
  @Column("text", { nullable: true })
  public latitude: string;
  @Column("text", { nullable: true })
  public avatar: string;
  @Column("text", { nullable: true })
  public timservice: string;
  @Column("text", { nullable: true })
  public name: string;
  @OneToMany(() => Food, (post: Food) => post.storeid)
  public food: Food[];
}

export default Store;
