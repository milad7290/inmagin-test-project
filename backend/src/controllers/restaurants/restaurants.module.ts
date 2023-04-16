import { Module } from "@nestjs/common";
import { RestaurantsServiceModule } from "src/services/db/restaurants/restaurants.service.module";
import { RestaurantsController } from "./restaurants.controller";

@Module({
  imports: [RestaurantsServiceModule],
  controllers: [RestaurantsController],
})
export class RestaurantModule {}
