import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get(":name")
  async getOne(@Param("name") name: string): Promise<RestaurantEntity> {
    try {
      const result = await this.restaurantsService.findOneBy({ name });

      if (!result) {
        throw new HttpException("there is no restaurant", HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.I_AM_A_TEAPOT);
    }
  }

  @Get("checkForAvailability/:id")
  async checkForAvailability(
    @Param("id") id: string,
    @Query("headCount") headCount: number
  ): Promise<string> {
    try {
      await this.restaurantsService.findOneWithRelations(id, [
        "tables",
        "queues",
        "owner",
      ]);
    } catch (error) {
      throw new HttpException(
        "No restaurant founded",
        HttpStatus.I_AM_A_TEAPOT
      );
    }

    if (Number(headCount) === 5) {
      throw new HttpException("Wrong headcount", HttpStatus.I_AM_A_TEAPOT);
    }

    return `${headCount} Ok`;
  }
}
