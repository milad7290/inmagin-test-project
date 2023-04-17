import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateRestaurantDto } from "src/models/dto/admin/restaurant/update-restaurant.dto";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { ConfigService } from "src/services/config/config.service";
import { UsersService } from "src/services/db/users/users.service";
import { PasswordCryptographerService } from "src/services/password-cryptographer/password-cryptographer.service";
import { RestaurantsService } from "../../../services/db/restaurants/restaurants.service";

@Controller("admin/restaurants")
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private configService: ConfigService,
    private encryptionService: PasswordCryptographerService,
    private usersService: UsersService
  ) {
    this.initSeedData();
  }

  async initSeedData() {
    let foundedOwner = await this.usersService.findOneBy({
      email: this.configService.SeedDataConfig.seedEmail,
    });
    if (!foundedOwner) {
      const password = await this.encryptionService.doHash(
        this.configService.SeedDataConfig.seedPassword
      );
      foundedOwner = await this.usersService.save({
        name: this.configService.SeedDataConfig.seedOwnerName,
        email: this.configService.SeedDataConfig.seedEmail,
        password,
      });
    }

    const foundedRestaurant = await this.restaurantsService.findOneBy({
      name: this.configService.SeedDataConfig.seedRestaurantName,
    });
    if (!foundedRestaurant) {
      this.restaurantsService.save({
        name: this.configService.SeedDataConfig.seedRestaurantName,
        maxNumberOfTables: 5,
        maxNumberOfChairsPerTable: 8,
        owner: foundedOwner,
      });
    }
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param("id") id: string): Promise<RestaurantEntity> {
    const result = await this.restaurantsService.findOneWithRelations(id, [
      "tables",
      "queues",
      "owner",
    ]);

    if (!result) {
      throw new HttpException("there is no restaurant", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  async update(@Body() dto: UpdateRestaurantDto): Promise<RestaurantEntity> {
    const foundRestaurant = await this.restaurantsService.findOneWithRelations(
      dto.id,
      ["tables"]
    );

    if (!foundRestaurant) {
      throw new HttpException("Restaurant not found", HttpStatus.NOT_FOUND);
    }

    if (
      foundRestaurant.tables &&
      foundRestaurant.tables.length > dto.maxNumberOfTables
    ) {
      throw new HttpException(
        `Right now we have ${foundRestaurant.tables.length} tables, we can't set 'Max no of tables' to ${dto.maxNumberOfTables} (unless you remove some tables)`,
        HttpStatus.NOT_FOUND
      );
    }

    for (let i = 0; i < foundRestaurant.tables.length; i++) {
      const table = foundRestaurant.tables[i];
      if (table.chairsNo > dto.maxNumberOfChairsPerTable) {
        throw new HttpException(
          `Right now we have ${table.name} table with ${table.chairsNo} capacity of chairs, we can't set 'Max no of chairs at every table' to ${dto.maxNumberOfChairsPerTable} (unless you remove ${table.name})`,
          HttpStatus.NOT_FOUND
        );
      }
    }

    await this.restaurantsService.updateOne(dto.id, {
      maxNumberOfChairsPerTable: dto.maxNumberOfChairsPerTable,
      maxNumberOfTables: dto.maxNumberOfTables,
    });

    return this.restaurantsService.findOneWithRelations(dto.id, [
      "tables",
      "queues",
      "owner",
    ]);
  }
}
