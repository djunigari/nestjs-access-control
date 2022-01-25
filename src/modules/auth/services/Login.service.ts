import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/modules/roles/entities/role.entity';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async execute(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles.map((role: Role) => role.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
