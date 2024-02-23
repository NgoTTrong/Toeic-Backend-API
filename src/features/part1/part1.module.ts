import { Module } from '@nestjs/common';
import { Part1Service } from './part1.service';
import { Part1Controller } from './part1.controller';

@Module({
  controllers: [Part1Controller],
  providers: [Part1Service],
})
export class Part1Module {}
