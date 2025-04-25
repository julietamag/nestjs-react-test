import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';
import { NextDelivery } from 'src/common/types';

@Controller('comms')
export class CommsController {
  constructor(private commsService: CommsService) {}

  @Get('your-next-delivery/:id')
  getNextDelivery(@Param('id') id: string): NextDelivery {
    return this.commsService.getNextDelivery(id);
  }
}
