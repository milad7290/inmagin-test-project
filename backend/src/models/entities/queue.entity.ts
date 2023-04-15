import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "queue" })
export class QueueEntity extends BaseEntity<QueueEntity> {
  @Column()
  queueNo: number;

  @Column()
  headcount: number;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.queues)
  restaurant: RestaurantEntity;
}
