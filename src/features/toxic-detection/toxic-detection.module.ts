import { Module } from '@nestjs/common';
import { ToxicDetectionService } from './toxic-detection.service';
import { ToxicDetectionController } from './toxic-detection.controller';

@Module({
  controllers: [ToxicDetectionController],
  providers: [ToxicDetectionService],
})
export class ToxicDetectionModule {}
