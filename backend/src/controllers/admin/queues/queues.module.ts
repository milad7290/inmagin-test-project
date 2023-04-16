import { Module } from "@nestjs/common";
import { QueuesServiceModule } from "src/services/db/queues/queues.service.module";
import { RestaurantsServiceModule } from "src/services/db/restaurants/restaurants.service.module";
import { QueuesController } from "./queues.controller";

@Module({
  imports: [QueuesServiceModule, RestaurantsServiceModule],
  controllers: [QueuesController],
})
export class QueueModule {}
