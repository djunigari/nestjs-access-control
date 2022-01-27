import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { CreateUserController } from './controllers/CreateUser.controller';
import { DeleteUserController } from './controllers/DeleteUser.controller';
import { FindAllUsersController } from './controllers/FindAllUsers.controller';
import { FindUserByIdController } from './controllers/FindUserById.controller';
import { SetUserRolesController } from './controllers/SetUserRoles.controller';
import { UpdateUserController } from './controllers/UpdateUser.controller';
import { User } from './entities/user.entity';
import { BaseUserService } from './services/BaseUser.service';
import { CreateUserService } from './services/CreateUser.service';
import { DeleteUserService } from './services/DeleteUser.service';
import { FindAllPermissionsOfUserByIdService } from './services/FindAllPermissionsOfUserById.service';
import { FindAllUsersService } from './services/FindAllUsers.service';
import { FindUserByIdService } from './services/FindUserById.service';
import { SetUserRolesService } from './services/SetUserRoles.service';
import { UpdateUserService } from './services/UpdateUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    FindAllUsersController,
    FindUserByIdController,
    SetUserRolesController,
  ],
  providers: [
    BaseUserService,
    CreateUserService,
    DeleteUserService,
    UpdateUserService,
    FindAllUsersService,
    FindUserByIdService,
    SetUserRolesService,
    FindAllPermissionsOfUserByIdService,
  ],
  exports: [TypeOrmModule, FindAllPermissionsOfUserByIdService],
})
export class UsersModule {}
