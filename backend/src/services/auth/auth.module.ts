import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt-strategy.service";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.AuthSecretToken,
        signOptions: {
          expiresIn: "3d",
        },
      }),
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
