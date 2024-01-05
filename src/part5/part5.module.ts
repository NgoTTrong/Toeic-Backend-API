import { Module } from '@nestjs/common';
import { Part5Service } from './part5.service';
import { Part5Controller } from './part5.controller';

@Module({
  controllers: [Part5Controller],
  providers: [Part5Service],
})
export class Part5Module {}
