import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const userData = {
      googleId: profile.id,
      email: profile.emails?.[0]?.value || null,
      username: profile.displayName || profile.name?.givenName || 'NoName',
    };

    const user = await this.authService.validateUser(userData);

    done(null, {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      role: user.role,
    });
  }
}
