import { Module } from "@nestjs/common";
import { ChairsServiceModule } from "src/services/db/chairs/chairs.service.module";
import { QueuesServiceModule } from "src/services/db/queues/queues.service.module";
import { RestaurantsServiceModule } from "src/services/db/restaurants/restaurants.service.module";
import { TablesServiceModule } from "src/services/db/tables/tables.service.module";
import { QueueCheckServiceModule } from "src/services/queue/queue-check.service.module";
import { TablesController } from "./tables.controller";

@Module({
  imports: [
    RestaurantsServiceModule,
    TablesServiceModule,
    ChairsServiceModule,
    QueuesServiceModule,
    QueueCheckServiceModule,
  ],
  controllers: [TablesController],
})
export class TableModule {}
