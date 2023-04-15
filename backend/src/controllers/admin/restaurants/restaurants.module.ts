import { Module } from "@nestjs/common";
import { RestaurantsServiceModule } from "src/services/db/restaurants/restaurants.service.module";
import { UsersServiceModule } from "src/services/db/users/users.service.module";
import { PasswordCryptographerServiceModule } from "src/services/password-cryptographer/password-cryptographer.module";
import { RestaurantsController } from "./restaurants.controller";

@Module({
  imports: [
    RestaurantsServiceModule,
    UsersServiceModule,
    PasswordCryptographerServiceModule,
  ],
  controllers: [RestaurantsController],
})
export class RestaurantModule {}
