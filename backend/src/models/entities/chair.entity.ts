import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { TableEntity } from "./table.entity";

@Entity({ name: "chair" })
export class ChairEntity extends BaseEntity<ChairEntity> {
  @Column()
  name: string;

  @Column("uuid")
  tableId: string;

  @ManyToOne((type) => TableEntity, (table) => table.chairs)
  table: TableEntity;
}
