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
import Driver from "../driver/driver.entity";
import Customer from "../customer/customer.entity";
import Store from "../store/store.entity";
import Food from "../food/food.entity";
import Cart_Food from "./cart_food.entity";
@Entity()
class Cart {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("int", { nullable: true })
  public mtime: number;
  @Column("int", { nullable: true })
  public dtime: number;

  @Column("text", { nullable: true })
  public note: string;
  @Column("int", { nullable: true })
  public status: number;
  @Column("text", { nullable: true })
  public longtite: string;
  @Column("text", { nullable: true })
  public latitu: string;

  @ManyToOne(() => Driver, (driver: Driver) => driver.id)
  public DriverID: Driver;

  @ManyToOne(() => Customer, (driver: Customer) => driver.id)
  public CustomerID: Customer;

  @ManyToOne(() => Store, (store: Store) => store.id)
  public StoreID: Customer;

  @OneToMany((type) => Cart_Food, (Cart_Food) => Cart_Food.cart)
  cart_food: Cart_Food[];
}

export default Cart;
