import { Controller, Res, Req, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { KakaoAuthGuard } from 'src/auth/guard/kakao-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao')
  async kakaoLogin() {
    return;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao/callback')
  async kakaocallback(@Req() req: any, @Res() res: Response) {
    res.redirect('http://localhost:3000');
  }
}
