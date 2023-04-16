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
    let availableSoFar = 0;
    let canBeSetForaCustomer = [];
    let weHaveEnoughTablesForHeadCount = false;

    for (let i = 0; i < availableTables.length; i++) {
      const element = availableTables[i];

      availableSoFar = availableSoFar + element.chairsNo;
      canBeSetForaCustomer.push({ id: element.id, name: element.name });

      if (availableSoFar >= customerHeadCount) {
        weHaveEnoughTablesForHeadCount = true;
        break;
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
