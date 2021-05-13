import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import "reflect-metadata";
import Customer from "../customer/customer.entity";

import Food from "../food/food.entity";
@Entity()
class FeedBackFood {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public content: string;

  @Column("int", { nullable: true })
  public star: number;

  @ManyToOne(() => Customer, (customer: Customer) => customer.id)
  public CustomerID: Customer;

  @ManyToOne(() => Food, (Store: Food) => Store.id)
  public food: Food;
}

export default FeedBackFood;
