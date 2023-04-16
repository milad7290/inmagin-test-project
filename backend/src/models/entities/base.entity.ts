import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date", { default: () => "(CURRENT_DATE)" })
  createDateTime: Date;

  constructor(item?: Partial<T>) {
    if (item) {
      Object.assign(this, item);
    }
  }
}
