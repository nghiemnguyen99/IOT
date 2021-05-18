import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column("text", { nullable: true })
  public author: string;

  @Column("text", { nullable: true })
  public title: string;

  @Column("text", { nullable: true })
  public content: string;
}

export default Post;
