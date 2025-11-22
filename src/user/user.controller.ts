import { Controller, Put, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user as any;
    if (!user) throw new Error('Unauthorized');
    
    return this.userService.updateUser(user.id, updateUserDto);
  }
}
