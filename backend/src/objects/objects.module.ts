import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { HeyamaObject, ObjectSchema } from './schemas/object.schema';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeyamaObject.name, schema: ObjectSchema },
    ]),
    S3Module,
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService],
  exports: [ObjectsService],
})
export class ObjectsModule {}
