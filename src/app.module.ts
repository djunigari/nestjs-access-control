import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionsModule } from './modules/permission/permissions.module';
import { RolesModule } from './modules/role/roles.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PermissionsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
