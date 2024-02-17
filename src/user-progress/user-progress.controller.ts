import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { Public } from 'src/core/decorators';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}
  @Get('/all/:courseId')
  @Public()
  getAllProgress(@Param('courseId') courseId: number) {
    return this.userProgressService.getAllProgress(+courseId, 1);
  }

  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.update(+id, updateUserProgressDto);
  }
  @Post('create-or-update')
  @Public()
  updateOrCreateProgress(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.updateOrCreate(+id, updateUserProgressDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(+id);
  }
}
