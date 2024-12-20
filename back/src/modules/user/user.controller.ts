import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }
}
