import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../role/roles.module';
import { CreateUserController } from './CreateUser.controller';
import { CreateUserService } from './CreateUser.service';
import { CreateUserAccessControlListController } from './CreateUserAccessControlList.controller';
import { CreateUserAccessControlListService } from './CreateUserAccessControlList.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, PermissionsModule],
  providers: [CreateUserService, CreateUserAccessControlListService],
  controllers: [CreateUserController, CreateUserAccessControlListController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
