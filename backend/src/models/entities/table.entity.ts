import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ChairEntity } from "./chair.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "table" })
export class TableEntity extends BaseEntity<TableEntity> {
  @Column()
  name: string;

  @Column()
  chairsNo: number;

  @Column()
  isAvailable: boolean;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.tables)
  restaurant: RestaurantEntity;

  @OneToMany((type) => ChairEntity, (chair) => chair.table)
  chairs: ChairEntity[];
}
