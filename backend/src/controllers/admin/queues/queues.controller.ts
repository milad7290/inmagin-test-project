import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common'
import { QueueEntity } from 'src/models/entities/queue.entity'
import { QueuesService } from '../../../services/db/queues/queues.service'

@Controller('admin/queues')
export class QueuesController {
  constructor(private queuesService: QueuesService) {}

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id: string): Promise<QueueEntity> {
    try {
      const result = await this.queuesService.findOneWithRelations(id, [
        'queues',
        'queues',
      ])

      return result
    } catch (error) {
      throw new HttpException(
        'there is no resturant ',
        HttpStatus.I_AM_A_TEAPOT,
      )
    }
  }
}
