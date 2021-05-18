import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import Store from "../store/store.entity";
import Customer from "../customer/customer.entity";
import Cart_Food from "../cart/cart_food.entity";
import FeedBackFood from "../feedback/feedbackfood.entity";
import FoodOption from "../optionfood/optionfood.entity";
@Entity()
class Food {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public namefood: string;

  @Column("text", { nullable: true })
  public image: string;

  @Column("int", { nullable: true })
  public status: number; // 1 da update va dang online  2 da change
  @Column("int", { nullable: true })
  public sale: number;
  @Column("text", { nullable: true })
  public price: string;

  @Column("text", { nullable: true })
  public typer: string;

  @ManyToOne(() => Store, (author: Store) => author.id)
  public storeid: Store;

  // @ManyToOne(() => Cart, (Cart: Cart) => Cart.id)
  // public cart: Cart;
  @OneToMany((type) => Cart_Food, (userGroup) => userGroup.food)
  food_cart: Cart_Food[];

  @OneToMany((type) => FeedBackFood, (userGroup) => userGroup.food)
  food_feedback: FeedBackFood[];

  @OneToMany((type) => FoodOption, (userGroup) => userGroup.foodid)
  option: FoodOption[];
}

export default Food;
