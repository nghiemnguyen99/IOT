import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import "reflect-metadata";
import Customer  from "../customer/customer.entity";

import Store from "../store/store.entity";
@Entity()
class FeedBack {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("text", { nullable: true })
    public content: string;


    @ManyToOne(() => Customer, (customer: Customer) => customer.id)
    public CustomerID: Customer;

    @ManyToOne(() => Store, (Store: Store) => Store.id)
    public StoreID: Store;


}

export default FeedBack;
