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
import { ConfigModule } from "./services/config/config.module";
import { ConfigService } from "./services/config/config.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // connectionName: "default",
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.TypeOrmConfig.host,
        port: configService.TypeOrmConfig.port,
        username: configService.TypeOrmConfig.username,
        database: configService.TypeOrmConfig.database,
        entities: [
          RestaurantEntity,
          UserEntity,
          TableEntity,
          ChairEntity,
          QueueEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    RestaurantModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
