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
import { QueuesService } from "./../../services/db/queues/queues.service";

@Controller("restaurants")
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private tablesService: TablesService,
    private queuesService: QueuesService
  ) {}

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
    const [availableTables, restaurant] = await Promise.all([
      this.tablesService.findAvailable(id),
      this.restaurantsService.findOne(id),
    ]);

    const customerHeadCount = Number(headCount);

    let availableSoFar = 0;
    let canBeSetForaCustomer = [];
    let weHaveEnough = false;

    for (let i = 0; i < availableTables.length; i++) {
      const element = availableTables[i];

      availableSoFar = availableSoFar + element.chairsNo;
      canBeSetForaCustomer.push({ id: element.id, name: element.name });

      if (availableSoFar >= customerHeadCount) {
        weHaveEnough = true;
        break;
      }
    }

    if (weHaveEnough) {
      const tableList = _.map(canBeSetForaCustomer, "name").join(" and ");
      await Promise.all(
        canBeSetForaCustomer.map(async (table) => {
          await this.tablesService.updateOne(table.id, {
            isAvailable: false,
          });
        })
      );
      return `${canBeSetForaCustomer.length} tables required, head to Table ${tableList}`;
    } else {
      const maxResult = await this.queuesService.getOneMaximumQueueNo(id);
      const generatedQueueNo = maxResult.max ? maxResult.max + 1 : 101;
      await this.queuesService.save({
        queueNo: generatedQueueNo,
        headcount: customerHeadCount,
        restaurant: restaurant,
      });

      throw new HttpException(
        `Sorry there is not enough available table right now, we put you on waiting queue, here is your queue numberQ:${generatedQueueNo}`,
        HttpStatus.I_AM_A_TEAPOT
      );
    }
  }
}
