import {
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Array<Express.Multer.File>,
  ) {
    console.log(file);
    return {
      file,
    };
  }

  @Get('profile')
  getProfile(@GetUser('email') email: string) {
    return 'user email: ' + email;
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return 'id: ' + id;
  }
}
