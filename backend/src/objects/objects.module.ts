import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { HeyamaObject, ObjectSchema } from './schemas/object.schema';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeyamaObject.name, schema: ObjectSchema },
    ]),
    WebSocketModule,
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService],
  exports: [ObjectsService],
})
export class ObjectsModule {}
