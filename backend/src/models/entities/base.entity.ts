import { CreateDateColumn, ObjectID, ObjectIdColumn } from "typeorm";

export abstract class BaseEntity<T> {
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createDateTime: Date;

  constructor(item?: Partial<T>) {
    if (item) {
      Object.assign(this, item);
    }
  }
}
