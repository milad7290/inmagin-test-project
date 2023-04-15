import { Module } from '@nestjs/common';
import { PasswordCryptographerServiceModule } from 'src/services/password-cryptographer/password-cryptographer.module';
import { AuthServiceModule } from '../../services/auth/auth.module';
import { UsersServiceModule } from '../../services/db/users/users.service.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersServiceModule, AuthServiceModule,
    PasswordCryptographerServiceModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
