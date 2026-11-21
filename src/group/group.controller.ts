import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service.js';
import { CreateGroupDto } from './dto/create-group.dto.js';
import { UpdateGroupDto } from './dto/update-group.dto.js';
import { CreateMessageDto } from './dto/create-message.js';
import { CurrentUser } from '../common/decoraters/user.decorater.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.findOrcreate(createGroupDto.name);
  }
  @Post(':id/new-Message')
  createMessage(@Body() d: CreateMessageDto,
    @Param('id', ParseIntPipe) groupId: number,
    @CurrentUser('id') userId: number) {
    return this.groupService.newMessage(groupId, d.content, userId);
  }
  @Get(':id/messages')
  getAll(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.getAllMessages(id);

  }

}
