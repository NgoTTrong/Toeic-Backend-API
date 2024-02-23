import { Module } from '@nestjs/common';
import { Part2Service } from './part2.service';
import { Part2Controller } from './part2.controller';

@Module({
  controllers: [Part2Controller],
  providers: [Part2Service],
})
export class Part2Module {}
