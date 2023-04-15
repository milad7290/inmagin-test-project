import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { QueueModule } from "./controllers/admin/queues/queues.module";
import { RestaurantModule } from "./controllers/admin/restaurants/restaurants.module";
import { TableModule } from "./controllers/admin/tables/tables.module";
import { AuthModule } from "./controllers/auth/auth.module";
import { UsersModule } from "./controllers/users/users.module";
import { ChairEntity } from "./models/entities/chair.entity";
import { QueueEntity } from "./models/entities/queue.entity";
import { RestaurantEntity } from "./models/entities/restaurant.entity";
import { TableEntity } from "./models/entities/table.entity";
import { UserEntity } from "./models/entities/user.entity";
import { AppService } from "./services/app/app.service";
import { configService } from "./services/config/config.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: configService.getTypeOrmConfig().url,
      database: configService.getTypeOrmConfig().database,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([
      RestaurantEntity,
      UserEntity,
      TableEntity,
      ChairEntity,
      QueueEntity,
    ]),
    UsersModule,
    AuthModule,
    RestaurantModule,
    TableModule,
    QueueModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
