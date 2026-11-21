import { Module } from '@nestjs/common';
import { GroupService } from './group.service.js';
import { GroupController } from './group.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports : [PrismaModule] ,
  controllers: [GroupController],
  providers: [GroupService],
  exports : [GroupService  ]
})
export class GroupModule {}
