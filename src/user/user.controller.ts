import { Controller, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service.js';

import { UpdateUserDto } from './dto/update-user.dto.js';
import { CurrentUser } from '../common/decoraters/user.decorater.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  update(@CurrentUser('id') id : number , @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id , updateUserDto.name);
  }

  
}
