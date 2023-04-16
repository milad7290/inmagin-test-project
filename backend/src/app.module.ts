import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AdminModule } from "./controllers/admin/admin.module";
import { RestaurantModule } from "./controllers/restaurants/restaurants.module";
import { ChairEntity } from "./models/entities/chair.entity";
import { QueueEntity } from "./models/entities/queue.entity";
import { RestaurantEntity } from "./models/entities/restaurant.entity";
import { TableEntity } from "./models/entities/table.entity";
import { UserEntity } from "./models/entities/user.entity";
import { AppService } from "./services/app/app.service";
import { configService } from "./services/config/config.service";

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "mongodb",
    //   url: configService.getTypeOrmConfig().url,
    //   database: configService.getTypeOrmConfig().database,
    //   entities: [__dirname + "/**/*.entity{.ts,.js}"],
    //   ssl: false,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      // password: "root",
      database: configService.getTypeOrmConfig().database,
      entities: [
        RestaurantEntity,
        UserEntity,
        TableEntity,
        ChairEntity,
        QueueEntity,
      ],
      synchronize: true,
    }),
    // TypeOrmModule.forFeature([
    //   RestaurantEntity,
    //   UserEntity,
    //   TableEntity,
    //   ChairEntity,
    //   QueueEntity,
    // ]),
    AdminModule,
    RestaurantModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
