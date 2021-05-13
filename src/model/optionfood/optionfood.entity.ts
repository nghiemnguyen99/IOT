import Food from "../food/food.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class FoodOption {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text", { nullable: true })
  public name: string;
  @Column("text", { nullable: true })
  public price: string;

  @Column("int", { nullable: true })
  public status: number;

  @ManyToOne(() => Food, (author: Food) => author.id)
  public foodid: Food;
}

export default FoodOption;
