import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) { }

  async findOrcreate(name: string) {
    const group = await this.prisma.group.findUnique({
      where: { name }
    })
    if (group) {
      return {
        group: group,
        masseges: await this.getAllMessages(group.id)


      };
    }
    const group2 = await this.prisma.group.create({
      data: {
        name
      },
    });

    return {
      group: group2,
      masseges: null

    }
  }

  async newMessage(groupId: number, content: string, userId: number) {
    return await this.prisma.message.create({
      data: {
        content,
        groupId,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }


  async getAllMessages(groupId: number) {
    return await this.prisma.message.findMany({
      where: { groupId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}