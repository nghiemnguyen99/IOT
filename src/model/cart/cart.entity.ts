import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import "reflect-metadata";
import Driver from '../driver/driver.entity'
import Customer from '../customer/customer.entity'
import Store from '../store/store.entity'
import Food from "../food/food.entity";
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


    @ManyToOne(() => Driver, (driver: Driver) => driver.id)
    public DriverID : Driver;

    @ManyToOne(() => Customer, (driver: Customer) => driver.id)
    public CustomerID : Customer;

    @ManyToOne(() => Store, (store: Store) => store.id)
    public StoreID : Customer;

    @OneToMany(() => Food, (Food: Food) => Food.cart)
    public foods: Food[];

}

export default Cart;
