import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createObjectDto: CreateObjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const userId = '00000000-0000-0000-0000-000000000000';
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
