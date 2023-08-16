import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from 'src/auth/strategy/kakao.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, KakaoStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
