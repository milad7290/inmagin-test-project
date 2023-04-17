import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as _ from "lodash";
import { CreateTableDto } from "src/models/dto/admin/table/create-table.dto";
import { SetAsAvailableTableDto } from "src/models/dto/admin/table/set-as-available-table.dto";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { TableEntity } from "src/models/entities/table.entity";
import { ChairsService } from "src/services/db/chairs/chairs.service";
import { QueuesService } from "src/services/db/queues/queues.service";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";
import { QueueCheckService } from "src/services/queue/queue-check.service";
import { TablesService } from "../../../services/db/tables/tables.service";

@Controller("admin/tables")
export class TablesController {
  constructor(
    private restaurantsService: RestaurantsService,
    private tablesService: TablesService,
    private chairService: ChairsService,
    private queuesService: QueuesService,
    private queueCheckService: QueueCheckService
  ) {}

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param("id") id: string): Promise<TableEntity> {
    const result = await this.tablesService.findOne(id);

    if (!result) {
      throw new HttpException("there is no table", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() dto: CreateTableDto): Promise<RestaurantEntity> {
    const [resultOrder, restaurant] = await Promise.all([
      this.tablesService.getOneMaximumOrder(dto.restaurantId),
      this.restaurantsService.findOneWithRelations(dto.restaurantId, [
        "tables",
      ]),
    ]);

    if (!restaurant) {
      throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
    }

    if (restaurant.tables.length >= restaurant.maxNumberOfTables) {
      throw new HttpException(
        `We are already reach the maximum capacity of tables in this restaurant! which is ${restaurant.maxNumberOfTables}`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (dto.chairNo > restaurant.maxNumberOfChairsPerTable) {
      throw new HttpException(
        `The maximum number of chair for our tables is ${restaurant.maxNumberOfChairsPerTable}`,
        HttpStatus.BAD_REQUEST
      );
    }

    const createdTable = await this.tablesService.save({
      order: resultOrder.max ? resultOrder.max + 1 : 1,
      name: resultOrder.max ? `T${resultOrder.max + 1}` : "T1",
      restaurant: restaurant,
      chairsNo: dto.chairNo,
      isAvailable: true,
    });

    const chairNumbers = [...Array(dto.chairNo).keys()];

    await Promise.all(
      chairNumbers.map(async (number) => {
        await this.chairService.save({
          name: `C${number}`,
          table: createdTable,
        });
      })
    );

    return this.restaurantsService.findOneWithRelations(dto.restaurantId, [
      "tables",
      "queues",
      "owner",
    ]);
  }

  @Patch("setTableAsAvailable")
  @UseGuards(AuthGuard("jwt"))
  async setTableAsAvailable(
    @Body() dto: SetAsAvailableTableDto
  ): Promise<[RestaurantEntity, string]> {
    const foundedTable = await this.tablesService.findOne(dto.tableId);

    if (!foundedTable) {
      throw new HttpException("Table not found", HttpStatus.NOT_FOUND);
    }

    const [firstInQueue, updatedTable] = await Promise.all([
      this.queuesService.getMinimumQueueNoItem(foundedTable.restaurantId),
      this.tablesService.save({
        id: dto.tableId,
        isAvailable: true,
      }),
    ]);

    const availableTables = await this.tablesService.findAvailable(
      foundedTable.restaurantId
    );

    let queueMessage = "";
    if (firstInQueue && availableTables.length > 0) {
      const [weHaveEnoughTablesForHeadCount, canBeSetForaCustomer] =
        await this.queueCheckService.checkAvailability(
          availableTables.sort((a, b) => a.chairsNo - b.chairsNo),
          firstInQueue.headcount
        );

      if (weHaveEnoughTablesForHeadCount) {
        const tableList = _.map(canBeSetForaCustomer, "name").join(" and ");

        await this.queuesService.updateOne(firstInQueue.id, {
          isSettled: true,
          settledReport: `This customer have been headed to Table ${tableList}`,
        });

        queueMessage = `For the queue number ${firstInQueue.queueNo} we need ${canBeSetForaCustomer.length} tables, head to Table ${tableList}`;
      } else {
        queueMessage = `For the queue number ${firstInQueue.queueNo} we still need mor available tablas`;
      }
    }

    const updatedRestaurant =
      await this.restaurantsService.findOneWithRelations(
        updatedTable.restaurantId,
        ["tables", "queues", "owner"]
      );

    return [updatedRestaurant, queueMessage];
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async removeTable(@Param("id") id: string): Promise<RestaurantEntity> {
    const foundedTable = await this.tablesService.findOne(id);

    if (!foundedTable) {
      throw new HttpException("Table not found", HttpStatus.NOT_FOUND);
    }

    await this.tablesService.remove([id]);

    return this.restaurantsService.findOneWithRelations(
      foundedTable.restaurantId,
      ["tables", "queues", "owner"]
    );
  }
}
