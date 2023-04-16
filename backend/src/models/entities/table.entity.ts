import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ChairEntity } from "./chair.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "table" })
export class TableEntity extends BaseEntity<TableEntity> {
  @Column()
  order: number;

  @Column()
  name: string;

  @Column()
  chairsNo: number;

  @Column()
  isAvailable: boolean;

  @Column("uuid")
  restaurantId: string;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.tables)
  restaurant: RestaurantEntity;

  @OneToMany((type) => ChairEntity, (chair) => chair.table)
  chairs: ChairEntity[];
}
