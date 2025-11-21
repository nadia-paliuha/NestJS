import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Role } from '../user/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userData: {
    googleId: string;
    email: string;
    username: string;
  }) {
    let user = await this.userService.findByGoogleId(userData.googleId);

    if (!user) {
      user = await this.userService.createUser({
        googleId: userData.googleId,
        email: userData.email,
        username: userData.username,
        role: Role.GUEST, 
      });
    }

    return user;
  }
}
