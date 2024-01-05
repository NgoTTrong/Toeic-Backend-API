import { Module } from '@nestjs/common';
import { Part4Service } from './part4.service';
import { Part4Controller } from './part4.controller';

@Module({
  controllers: [Part4Controller],
  providers: [Part4Service],
})
export class Part4Module {}
