import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Body,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectsService } from './objects.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateObjectDto } from './dto/create-object.dto';

@Controller('objects')
@UseGuards(JwtAuthGuard)
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createObjectDto: CreateObjectDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const userId = req.user.sub;
    return this.objectsService.create(createObjectDto, file, userId);
  }

  @Get()
  async findAll() {
    return this.objectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.objectsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.objectsService.remove(id);
  }
}
