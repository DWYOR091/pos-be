import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}
  async cekUser(username: string, password: string) {
    const user = await this.UserService.findUsername(username);
    const isValid = await this.UserService.comparePassword(
      password,
      user.password,
    );
    if (!isValid) throw new BadRequestException('password salah');
    return user;
  }

  generateToken(user: any) {
    const datatoken = { id: user.id, name: user.nama_user };
    const token = this.JwtService.sign(datatoken);
    return { token };
  }
}
