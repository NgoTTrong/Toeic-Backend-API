import { Module } from '@nestjs/common';
import { Part3Service } from './part3.service';
import { Part3Controller } from './part3.controller';

@Module({
  controllers: [Part3Controller],
  providers: [Part3Service],
})
export class Part3Module {}
