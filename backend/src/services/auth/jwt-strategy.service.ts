import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthUser } from '../../models/interfaces/auth/auth-user.model';
import { configService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @description pass the secret token and bearer token to super class.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getAuthSecretToken(),
    });
  }

  /**
   * @description return what we given to.
   * @param payload 
   * @returns whats you just passed
   */
  async validate(payload: IAuthUser): Promise<IAuthUser> {
    return payload;
  }
}
