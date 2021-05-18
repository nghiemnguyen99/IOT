import User from "../users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Cart from "../cart/cart.entity";
@Entity()
class Driver extends User {
  @Column("text", { nullable: true })
  public sdt: string;

  @Column("text", { nullable: true })
  public avatar: string;
  @Column("text", { nullable: true })
  public longitudeLastactivie: string;
  @Column("text", { nullable: true })
  public latitudeLastactivie: string;

  @Column("text", { nullable: true })
  public bikenumber: string;
  @Column("text", { nullable: true })
  public inforbike: string;
  @Column("int", { nullable: true })
  public status: number; // 0 chua active bao h   1 da active va active  2 da active va dang offline
  @Column("text", { nullable: true })
  public active_time: string;
  @OneToMany(() => Cart, (Cart: Cart) => Cart.DriverID)
  public Cart: Cart[];
}

export default Driver;
