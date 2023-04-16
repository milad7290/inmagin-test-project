import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne((type) => RestaurantEntity, (restaurant) => restaurant.owner)
  @JoinColumn()
  restaurant: RestaurantEntity;
}
