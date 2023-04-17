import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";
import * as _ from "lodash";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";
import { TablesService } from "src/services/db/tables/tables.service";
import { QueueCheckService } from "src/services/queue/queue-check.service";
import { QueuesService } from "./../../services/db/queues/queues.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private tablesService: TablesService,
    private queuesService: QueuesService,
    private queueCheckService: QueueCheckService
  ) {}

  @Get(":name")
  async getOne(@Param("name") name: string): Promise<RestaurantEntity> {
    const result = await this.restaurantsService.findOneBy({ name }, null, [
      "queues",
    ]);

    if (!result) {
      throw new HttpException("there is no restaurant", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Get("checkForAvailability/:id")
  async checkForAvailability(
    @Param("id") id: string,
    @Query("headCount") headCount: number
  ): Promise<string> {
    const restaurant = await this.restaurantsService.findOneWithRelations(id, [
      "tables",
    ]);

    if (!restaurant) {
      throw new HttpException("there is no restaurant", HttpStatus.NOT_FOUND);
    }

    let allChairs = 0;

    if (restaurant && restaurant.tables) {
      restaurant.tables.forEach((table) => {
        allChairs += table.chairsNo;
      });
    }

    if (headCount > allChairs) {
      throw new HttpException(
        `Sorry your headcount is more than our restaurant capacity`,
        HttpStatus.BAD_REQUEST
      );
    }

    const availableTables = restaurant.tables.filter(
      (item) => item.isAvailable
    );

    const customerHeadCount = Number(headCount);

    const [weHaveEnoughTablesForHeadCount, canBeSetForaCustomer] =
      await this.queueCheckService.checkAvailability(
        availableTables.sort((a, b) => a.chairsNo - b.chairsNo),
        customerHeadCount
      );

    if (weHaveEnoughTablesForHeadCount) {
      const tableList = _.map(canBeSetForaCustomer, "name").join(" and ");
      return `${canBeSetForaCustomer.length} tables required, head to Table ${tableList}`;
    } else {
      const maxResult = await this.queuesService.getMaximumQueueNo(id);
      const generatedQueueNo = maxResult.max ? maxResult.max + 1 : 101;
      await this.queuesService.save({
        queueNo: generatedQueueNo,
        headcount: customerHeadCount,
        restaurant: restaurant,
      });

      throw new HttpException(
        `Sorry there is not enough available table right now, we put you on waiting queue, here is your queue numberQ:${generatedQueueNo}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
