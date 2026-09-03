import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ObjectsModule } from './objects/objects.module';
import { WebSocketModule } from './websocket/websocket.module';
import { User } from './users/user.entity';
import { HeyamaObject } from './objects/object.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'heyama',
      entities: [User, HeyamaObject],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    ObjectsModule,
    WebSocketModule,
  ],
})
export class AppModule {}
