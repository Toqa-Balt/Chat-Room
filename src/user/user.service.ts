import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma : PrismaService){}

  async update(id: number, name : string) {
    return await this.prisma.user.update({
      where:{
        id
      },
      data : {name}
    })
  }

}
