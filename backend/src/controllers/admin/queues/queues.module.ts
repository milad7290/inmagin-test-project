import { Module } from '@nestjs/common'
import { QueuesServiceModule } from 'src/services/db/queues/queues.service.module'
import { QueuesController } from './queues.controller'

@Module({
  imports: [QueuesServiceModule],
  controllers: [QueuesController],
})
export class QueueModule {}
