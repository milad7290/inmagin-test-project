import { Module } from '@nestjs/common'
import { ChairsServiceModule } from 'src/services/db/chairs/chairs.service.module'
import { RestaurantsServiceModule } from 'src/services/db/restaurants/restaurants.service.module'
import { TablesServiceModule } from 'src/services/db/tables/tables.service.module'
import { TablesController } from './tables.controller'

@Module({
  imports: [RestaurantsServiceModule, TablesServiceModule, ChairsServiceModule],
  controllers: [TablesController],
})
export class TableModule {}
