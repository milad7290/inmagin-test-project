import { Module } from "@nestjs/common";
import { TablesServiceModule } from "../db/tables/tables.service.module";
import { QueueCheckService } from "./queue-check.service";
@Module({
  imports: [TablesServiceModule],
  providers: [QueueCheckService],
  exports: [QueueCheckService],
})
export class QueueCheckServiceModule {}
