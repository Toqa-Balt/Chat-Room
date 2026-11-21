import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { GroupModule } from './group/group.module.js';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './room/room.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoomModule , 
    AuthModule,
    PrismaModule,
    UserModule,
    GroupModule
  ],
  providers: []
})
export class AppModule { }
