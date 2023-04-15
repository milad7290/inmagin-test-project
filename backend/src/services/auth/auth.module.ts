import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configService } from '../config/config.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getAuthSecretToken(),
      signOptions: {
        expiresIn: '5h',
      },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
