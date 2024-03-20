import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToxicDetectionService } from './toxic-detection.service';
import { CreateToxicDetectionDto } from './dto/create-toxic-detection.dto';
import { UpdateToxicDetectionDto } from './dto/update-toxic-detection.dto';
import { Public } from 'src/core/decorators';
import { CheckToxicDto } from './dto/check-toxic.dto';

@Controller('toxic-detection')
export class ToxicDetectionController {
  constructor(private readonly toxicService: ToxicDetectionService) {}
  @Post()
  @Public()
  checkToxic(@Body() dto: CheckToxicDto) {
    return this.toxicService.classifyText(dto?.text);
  }
}
