import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import "reflect-metadata";
import Food from "../food/food.entity";
import FeedBack from "../feedback/feedback.entity";
import Cart from '../cart/cart.entity'
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
  public address: string;
  @Column("text", { nullable: true })
  public longitude: string;
  @Column("text", { nullable: true })
  public latitude: string;
  @Column("text", { nullable: true })
  public avatar: string;
  @Column("text", { nullable: true })
  public timeopen: string;
  @Column("text", { nullable: true })
  public timeclose: string;
  @Column("text", { nullable: true })
  public name: string;

  @OneToMany(() => Food, (post: Food) => post.storeid)
  @JoinColumn()
  public food: Food[];

  @OneToMany(() => FeedBack, (FeedBack: FeedBack) => FeedBack.StoreID)
  public FeedBack: FeedBack[];
  @OneToMany(() => Cart, (Cart: Cart) => Cart.StoreID)
  public Cart: Cart[];
}

export default Store;
