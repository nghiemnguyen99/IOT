import { Column, Entity, OneToMany } from "typeorm";
import "reflect-metadata";
import User from "../users/user.entity";
import FeedBack from "../feedback/feedback.entity";
import Cart from "../cart/cart.entity";
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

  @OneToMany(() => FeedBack, (FeedBack: FeedBack) => FeedBack.CustomerID)
  public FeedBack: FeedBack[];

  @OneToMany(() => Cart, (Cart: Cart) => Cart.CustomerID)
  public Cart: Cart[];
}

export default Customer;
