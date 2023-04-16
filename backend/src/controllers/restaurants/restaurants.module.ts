import { Module } from "@nestjs/common";
import { QueuesServiceModule } from "src/services/db/queues/queues.service.module";
import { RestaurantsServiceModule } from "src/services/db/restaurants/restaurants.service.module";
import { TablesServiceModule } from "src/services/db/tables/tables.service.module";
import { QueueCheckServiceModule } from "src/services/queue/queue-check.service.module";
import { RestaurantsController } from "./restaurants.controller";

@Module({
  imports: [
    RestaurantsServiceModule,
    TablesServiceModule,
    QueuesServiceModule,
    QueueCheckServiceModule,
  ],
  controllers: [RestaurantsController],
})
export class RestaurantModule {}
