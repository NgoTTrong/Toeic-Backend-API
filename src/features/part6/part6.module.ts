import { Module } from '@nestjs/common';
import { Part6Service } from './part6.service';
import { Part6Controller } from './part6.controller';

@Module({
  controllers: [Part6Controller],
  providers: [Part6Service],
})
export class Part6Module {}
