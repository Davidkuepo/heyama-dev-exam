import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ObjectsModule } from './objects/objects.module';
import { S3Module } from './s3/s3.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/heyama-dev',
    ),
    AuthModule,
    ObjectsModule,
    S3Module,
    WebSocketModule,
  ],
})
export class AppModule {}
