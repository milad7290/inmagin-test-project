import { Injectable } from "@nestjs/common";
import { TableEntity } from "src/models/entities/table.entity";
import { TablesService } from "../db/tables/tables.service";

@Injectable()
export class QueueCheckService {
  constructor(private tablesService: TablesService) {}

  async checkAvailability(
    availableTables: TableEntity[],
    customerHeadCount: number
  ): Promise<
    [
      weHaveEnoughTablesForHeadCount: Boolean,
      canBeSetForaCustomer: { id: string; name: string }[]
    ]
  > {
    let canBeSetForaCustomer = [];
    let weHaveEnoughTablesForHeadCount = false;

    loop1: for (let i = 0; i < customerHeadCount; i++) {
      let summed = 0;
      const usedTables = [];
      const tables = availableTables.filter(
        (item) => item.chairsNo > customerHeadCount - i
      );
      for (const table of tables) {
        usedTables.push(table);

        summed += table.chairsNo;
        if (summed >= customerHeadCount) {
          weHaveEnoughTablesForHeadCount = true;
          canBeSetForaCustomer = usedTables;
          break loop1;
        }
      }
    }

    if (weHaveEnoughTablesForHeadCount) {
      await Promise.all(
        canBeSetForaCustomer.map(async (table) => {
          await this.tablesService.updateOne(table.id, {
            isAvailable: false,
          });
        })
      );
    }

    return [weHaveEnoughTablesForHeadCount, canBeSetForaCustomer];
  }
}
