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
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { GetUser, Public } from 'src/core/decorators';
import { Payload } from 'src/core/type/jwt.payload';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}
  @Get('/all/:courseId')
  getAllProgress(
    @Param('courseId') courseId: string,
    @GetUser() user: Payload,
  ) {
    return this.userProgressService.getAllProgress(courseId, user.id);
  }

  @Get()
  @Public()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get(':id') 
  @Public()
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.update(id, updateUserProgressDto);
  }
  @Post('create-or-update')
  updateOrCreateProgress(
    @Body() updateUserProgressDto: UpdateUserProgressDto,
    @GetUser() user: Payload,
  ) {
    return this.userProgressService.updateOrCreate(
      updateUserProgressDto,
      user.id,
    );
  }
  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(+id);
  }
}
