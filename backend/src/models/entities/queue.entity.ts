import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "queue" })
export class QueueEntity extends BaseEntity<QueueEntity> {
  @Column()
  queueNo: number;

  @Column()
  headcount: number;

  @Column("uuid")
  restaurantId: string;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.queues, {
    onDelete: "CASCADE",
  })
  restaurant: RestaurantEntity;
}
