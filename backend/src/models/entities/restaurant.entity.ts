import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { QueueEntity } from "./queue.entity";
import { TableEntity } from "./table.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "restaurant" })
export class RestaurantEntity extends BaseEntity<RestaurantEntity> {
  @Column()
  name: string;

  @Column()
  maxNumberOfTables: number;

  @Column()
  maxNumberOfChairsPerTable: number;

  @OneToMany((type) => TableEntity, (table) => table.restaurant)
  tables: TableEntity[];

  @OneToMany((type) => QueueEntity, (queue) => queue.restaurant)
  queues: QueueEntity[];

  @OneToOne((type) => UserEntity, (owner) => owner.restaurant)
  owner: UserEntity;
}
