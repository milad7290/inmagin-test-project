import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IAuthUser } from "../../models/interfaces/auth/auth-user.model";
import { ConfigService } from "../config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @description pass the secret token and bearer token to super class.
   */
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.AuthSecretToken,
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
