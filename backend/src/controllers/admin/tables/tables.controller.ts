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
import { CreateTableDto } from "src/models/dto/admin/table/create-table.dto";
import { SetAsAvailableTableDto } from "src/models/dto/admin/table/set-as-available-table.dto";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { TableEntity } from "src/models/entities/table.entity";
import { ChairsService } from "src/services/db/chairs/chairs.service";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";
import { TablesService } from "../../../services/db/tables/tables.service";

@Controller("admin/tables")
export class TablesController {
  constructor(
    private restaurantsService: RestaurantsService,
    private tablesService: TablesService,
    private chairService: ChairsService
  ) {}

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param("id") id: string): Promise<TableEntity> {
    try {
      const result = await this.tablesService.findOne(id);

      if (!result) {
        throw new HttpException("there is no table", HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.I_AM_A_TEAPOT);
    }
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() dto: CreateTableDto): Promise<RestaurantEntity> {
    const [resultOrder, restaurant] = await Promise.all([
      this.tablesService.getOneMaximumOrder(dto.restaurantId),
      this.restaurantsService.findOne(dto.restaurantId),
    ]);

    if (!restaurant) {
      throw new HttpException("Restaurant not found", HttpStatus.I_AM_A_TEAPOT);
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

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  async setTableAsAvailable(
    @Body() dto: SetAsAvailableTableDto
  ): Promise<RestaurantEntity> {
    const foundedTable = await this.tablesService.findOne(dto.tableId);

    if (!foundedTable) {
      throw new HttpException("Table not found", HttpStatus.I_AM_A_TEAPOT);
    }

    const updatedTable = await this.tablesService.save({
      id: dto.tableId,
      isAvailable: true,
    });

    return this.restaurantsService.findOneWithRelations(
      updatedTable.restaurantId,
      ["tables", "queues", "owner"]
    );
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async removeTable(@Param("id") id: string): Promise<RestaurantEntity> {
    const foundedTable = await this.tablesService.findOne(id);

    if (!foundedTable) {
      throw new HttpException("Table not found", HttpStatus.I_AM_A_TEAPOT);
    }

    await this.tablesService.remove([id]);

    return this.restaurantsService.findOneWithRelations(
      foundedTable.restaurantId,
      ["tables", "queues", "owner"]
    );
  }
}
