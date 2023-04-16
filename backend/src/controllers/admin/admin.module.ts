import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { QueueModule } from "./queues/queues.module";
import { RestaurantModule } from "./restaurants/restaurants.module";
import { TableModule } from "./tables/tables.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RestaurantModule,
    TableModule,
    QueueModule,
  ],
})
export class AdminModule {}
