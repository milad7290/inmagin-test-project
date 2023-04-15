import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from "@nestjs/common";
import { ObjectID } from "mongodb";
import { UpdateRestaurantDto } from "src/models/dto/admin/restaurant/update-restaurant.dto";
import { RestaurantEntity } from "src/models/entities/restaurant.entity";
import { UsersService } from "src/services/db/users/users.service";
import { PasswordCryptographerService } from "src/services/password-cryptographer/password-cryptographer.service";
import { RestaurantsService } from "../../../services/db/restaurants/restaurants.service";

@Controller("admin/restaurants")
export class RestaurantsController {
  constructor(
    private restaurantsService: RestaurantsService,
    private encryptionService: PasswordCryptographerService,
    private usersService: UsersService
  ) {
    this.initSeedData();
  }

  async initSeedData() {
    let foundedOwner = await this.usersService.findOneBy({
      email: "test@owner.com",
    });
    if (!foundedOwner) {
      const password = await this.encryptionService.doHash("inmagin@123456");
      foundedOwner = await this.usersService.save({
        name: "Test restaurant owner",
        email: "test@owner.com",
        password,
      });
    }

    const foundedRestaurant = await this.restaurantsService.findOneBy({
      name: "Test restaurant",
    });
    if (!foundedRestaurant) {
      this.restaurantsService.save({
        name: "Test restaurant",
        maxNumberOfTables: 5,
        maxNumberOfChairsPerTable: 3,
        owner: foundedOwner,
      });
    }
  }

  @Get(":id")
  // @UseGuards(AuthGuard('jwt'))
  async getOne(@Param("id") id: string): Promise<RestaurantEntity> {
    try {
      const result = await this.restaurantsService.findOneWithRelations(
        ObjectID(id),
        ["tables", "queues", "owner"]
      );

      return result;
    } catch (error) {
      throw new HttpException(
        "there is no restaurant",
        HttpStatus.I_AM_A_TEAPOT
      );
    }
  }

  @Patch()
  // @UseGuards(AuthGuard('jwt'))
  async update(
    // @GetUser() user: UserEntity,
    @Body() dto: UpdateRestaurantDto
  ): Promise<RestaurantEntity> {
    /** before we update (edit) entity we must reveal the current entity */
    /** try to fine similar entity with same update info and prevent to save the same entities */
    const foundRestaurant = await this.restaurantsService.findOne(dto.id);

    /** if we not found existing record entity we throw error */
    if (!foundRestaurant) {
      throw new HttpException("Restaurant not found", HttpStatus.I_AM_A_TEAPOT);
    }

    /** save (update) existing entity */
    await this.restaurantsService.updateOne(dto.id, {
      maxNumberOfChairsPerTable: dto.maxNumberOfChairsPerTable,
      maxNumberOfTables: dto.maxNumberOfTables,
    });

    return this.restaurantsService.findOne(dto.id);
  }
}
