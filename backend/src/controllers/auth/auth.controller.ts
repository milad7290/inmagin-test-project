import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PasswordCryptographerService } from "src/services/password-cryptographer/password-cryptographer.service";
import { AuthUser } from "../../common/decorators/auth-user.decorator";
import { LoginDto } from "../../models/dto/auth/login.dto";
import { UserEntity } from "../../models/entities/user.entity";
import { IAuthUser } from "../../models/interfaces/auth/auth-user.model";
import { AuthService } from "../../services/auth/auth.service";
import { UsersService } from "../../services/db/users/users.service";

@Controller("auth")
export class AuthController {
  /**
   * @description inject all related and needed services to work with.
   * @param usersService
   * @param userCashRedisService
   * @param encryptionService
   * @param authService
   * @param helpersService
   * @param emailService
   * @param refreshTokensService
   */
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private encryptionService: PasswordCryptographerService
  ) {}

  @Get("self")
  @UseGuards(AuthGuard("jwt"))
  async self(@AuthUser() authUser: IAuthUser): Promise<UserEntity> {
    /** reveal current user  with permissions base on auth user (which comes from token) */
    const self = await this.usersService.findOne(authUser.id);
    /** return founded user */
    return self;
  }

  @Post("login")
  async login(
    @Body() dto: LoginDto
  ): Promise<{ user: UserEntity; token: string }> {
    /** change the email from dto to lower case (easy to work with) */
    const incomingEmail = dto.email
      .split(" ")
      .join("")
      .trim()
      .toLocaleLowerCase();

    /** reveal user base on incoming email, then if we found that try to compare the incoming password with founded user's password */
    const foundUser = await this.usersService.findOneBy(
      {
        email: incomingEmail,
      },
      null,
      ["restaurant"]
    );

    /** if tow password is not the same, throw error */
    if (
      !foundUser ||
      !(await this.encryptionService.doCompare(
        dto.password,
        foundUser.password
      ))
    ) {
      throw new HttpException(
        "Username or password is incorrect",
        HttpStatus.NOT_FOUND
      );
    }

    /** since user of system must always verified his email, we will check the email verification of user */
    let user = foundUser;

    /** generate new token for user */
    /** reveal current user with permissions base on founded user */
    const token = await this.generateToken(user);

    /** return an object contain (current login user, the token and the refresh token) */
    return {
      user,
      token,
    };
  }

  private async generateToken(user: UserEntity): Promise<string> {
    return this.authService.createToken({
      email: user.email,
      id: user.id,
    });
  }
}
