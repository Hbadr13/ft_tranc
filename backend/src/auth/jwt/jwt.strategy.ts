// jwt.strategy.ts

// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from '../auth.service'; 
import { use } from 'passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: process.env.JWT_SECRET, 
        });
    }
    
    async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload); 
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
