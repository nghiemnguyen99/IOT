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
import Customer from "../customer/customer.entity";
import Cart from "../cart/cart.entity";
@Entity()
class Food {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public namefood: string;

  @Column("text", { nullable: true })
  public image: string;

  @Column("int", { nullable: true })
  public status: number;
  @Column("int", { nullable: true })
  public sale: number;
  @Column("text", { nullable: true })
  public price: string;

  @ManyToOne(() => Store, (author: Store) => author.id)
  public storeid: Store;

  @ManyToOne(() => Cart, (Cart: Cart) => Cart.id)
  public cart : Cart;
}

export default Food;
