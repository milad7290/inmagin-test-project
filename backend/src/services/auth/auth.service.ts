import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from '../../models/interfaces/auth/auth-user.model';

@Injectable()
export class AuthService {

  /**
   * @description inject the jwt service.
   * @param jwtService
   */
  constructor(private jwtService: JwtService) {}

  /**
   *
   * @param token reveal a auth user base on token.
   * @returns auth user
   */
  verify(token: string): IAuthUser {
    return this.jwtService.verify(token);
  }

  /**
   * @description create token for auth user by using sign function.
   * @param user
   * @returns created token
   */
  async createToken(user: IAuthUser): Promise<string> {
    return this.jwtService.sign(user);
  }

  /**
   * @description decode the token to auth user by decode function.
   * @param token
   * @returns auth user
   */
  decode(token: string): IAuthUser {
    return this.jwtService.decode(token) as IAuthUser;
  }
}
