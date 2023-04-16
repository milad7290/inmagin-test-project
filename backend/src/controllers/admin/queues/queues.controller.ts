import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { QueueEntity } from "src/models/entities/queue.entity";
import { QueuesService } from "../../../services/db/queues/queues.service";

@Controller("admin/queues")
export class QueuesController {
  constructor(private queuesService: QueuesService) {}

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getOne(@Param("id") id: string): Promise<QueueEntity> {
    try {
      const result = await this.queuesService.findOne(id);

      if (!result) {
        throw new HttpException("there is no queue", HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.I_AM_A_TEAPOT);
    }
  }
}
