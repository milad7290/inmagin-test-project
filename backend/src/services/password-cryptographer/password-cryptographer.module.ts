import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { PasswordCryptographerService } from "./password-cryptographer.service";

@Module({
  imports: [ConfigModule],
  providers: [PasswordCryptographerService],
  exports: [PasswordCryptographerService],
})
export class PasswordCryptographerServiceModule {}
