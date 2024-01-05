import { Module } from '@nestjs/common';
import { Part7Service } from './part7.service';
import { Part7Controller } from './part7.controller';

@Module({
  controllers: [Part7Controller],
  providers: [Part7Service],
})
export class Part7Module {}
