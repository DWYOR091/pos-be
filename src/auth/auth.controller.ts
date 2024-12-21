import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() bodyLogin: AuthDto) {
    await this.authService.cekUser(bodyLogin.username, bodyLogin.password);
    return this.authService.generateToken(bodyLogin);
  }

  @Get('cek-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  cekUser(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
