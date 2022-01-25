import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { LoginController } from './controllers/login.controller';
import { AuthenticationService } from './services/Authentication.service';
import { LoginService } from './services/Login.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LoginService, LocalStrategy, JwtStrategy, AuthenticationService],
  controllers: [LoginController],
  exports: [],
})
export class AuthModule {}
