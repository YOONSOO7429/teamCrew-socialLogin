import { Injectable, Body } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_ID,
      callbackURL: '/auth/kakao/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    // profile에서 정보 추출
    const email = profile._json.kakao_account.email;
    const nickname = profile.displayName;
    const provider = 'kakao';

    // user 정보 확인
    const exUser = await this.authService.validateUser(email);
    if (exUser) {
      const token = await this.authService.getToken({ userId: exUser.userId });
      return token;
    }
    if (exUser === null) {
      const user = await this.authService.create({ email, nickname, provider });
      const token = await this.authService.getToken({ userId: user.userId });
      return token;
    }
  }
}
