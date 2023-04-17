import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { QueueEntity } from "src/models/entities/queue.entity";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";
import { QueuesService } from "../../../services/db/queues/queues.service";

@Controller("admin/queues")
export class QueuesController {
  constructor(
    private queuesService: QueuesService,
    private restaurantsService: RestaurantsService
  ) {}

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param("id") id: string): Promise<QueueEntity> {
    const result = await this.queuesService.findOne(id);

    if (!result) {
      throw new HttpException("there is no queue", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async removeTable(@Param("id") id: string): Promise<RestaurantEntity> {
    const foundedTable = await this.queuesService.findOne(id);

    if (!foundedTable) {
      throw new HttpException("Queue not found", HttpStatus.NOT_FOUND);
    }

    await this.queuesService.remove([id]);

    return this.restaurantsService.findOneWithRelations(
      foundedTable.restaurantId,
      ["tables", "queues", "owner"]
    );
  }
}
