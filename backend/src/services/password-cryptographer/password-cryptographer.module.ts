import { Module } from '@nestjs/common';
import { PasswordCryptographerService } from './password-cryptographer.service';

@Module({
  providers: [PasswordCryptographerService],
  exports: [PasswordCryptographerService],
})
export class PasswordCryptographerServiceModule {}
