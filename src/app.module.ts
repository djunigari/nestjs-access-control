import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolesModule } from './modules/role/roles.module';
import { UsersModule } from './modules/user/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionGuard } from './auth/permissions.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PermissionsModule,
    RolesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
