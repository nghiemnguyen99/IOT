import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import "reflect-metadata";
import Cart from "./cart.entity";
import Food from "../food/food.entity";
@Entity()
class Cart_Food {
  @Column("int", { nullable: true })
  public numberfood: number;

  @ManyToOne((type) => Cart, (user) => user.id, {
    primary: true,
  })
  cart: Cart;

  @ManyToOne((type) => Food, (group) => group.id, {
    primary: true,
    cascade: true,
    eager: true,
  })
  food: Food;
}

export default Cart_Food;
