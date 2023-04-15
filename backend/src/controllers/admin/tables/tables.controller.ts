import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ObjectID } from "mongodb";
import { CreateTableDto } from "src/models/dto/admin/table/create-table.dto";
import { TableEntity } from "src/models/entities/table.entity";
import { ChairsService } from "src/services/db/chairs/chairs.service";
import { RestaurantsService } from "src/services/db/restaurants/restaurants.service";
import { Raw } from "typeorm";
import { TablesService } from "../../../services/db/tables/tables.service";

@Controller("admin/tables")
export class TablesController {
  constructor(
    private restaurantService: RestaurantsService,
    private tablesService: TablesService,
    private chairService: ChairsService
  ) {}

  @Get(":id")
  // @UseGuards(AuthGuard('jwt'))
  async getOne(@Param("id") id: string): Promise<TableEntity> {
    try {
      const result = await this.tablesService.findOne(id);

      return result;
    } catch (error) {
      throw new HttpException(
        "there is no table whit this id ",
        HttpStatus.I_AM_A_TEAPOT
      );
    }
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(
    // @GetUser() user: UserEntity,
    @Body() dto: CreateTableDto
  ): Promise<TableEntity> {
    const [foundTable, restaurant] = await Promise.all([
      this.tablesService.findOneBy(null, [
        {
          name: Raw((alias) => `LOWER(${alias}) = '${dto.name.toLowerCase()}'`),
          restaurantId: dto.restaurantId,
        },
      ]),
      this.restaurantService.findOne(dto.restaurantId),
    ]);

    if (!restaurant) {
      throw new HttpException("Restaurant not found", HttpStatus.I_AM_A_TEAPOT);
    }

    if (foundTable) {
      throw new HttpException(
        "The table with this name already exist",
        HttpStatus.I_AM_A_TEAPOT
      );
    }

    const createdTable = await this.tablesService.save({
      name: dto.name,
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

    return this.tablesService.findOneWithRelations(ObjectID(createdTable.id), [
      "chairs",
    ]);
  }
}
