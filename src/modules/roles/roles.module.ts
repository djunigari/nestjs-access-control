import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { CreateRoleController } from './controllers/CreateRole.controller';
import { DeleteRoleController } from './controllers/DeleteRole.controller';
import { FindAllRolesController } from './controllers/FindAllRoles.controller';
import { FindRoleByIdController } from './controllers/FindRoleById.controller';
import { SetRolePermissionsController } from './controllers/SetRolePermissions.controller';
import { UpdateRoleController } from './controllers/UpdateRole.controller';
import { Role } from './entities/role.entity';
import { BaseRoleService } from './services/BaseRole.service';
import { CreateRoleService } from './services/CreateRole.service';
import { DeleteRoleService } from './services/DeleteRole.service';
import { FindAllRolesService } from './services/FindAllRole.service';
import { FindRoleByIdService } from './services/FindRoleById.service';
import { SetRolePermissionsService } from './services/SetRolePermissions.service';
import { UpdateRoleService } from './services/UpdateRole.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermissionsModule],
  controllers: [
    CreateRoleController,
    SetRolePermissionsController,
    DeleteRoleController,
    UpdateRoleController,
    FindAllRolesController,
    FindRoleByIdController,
  ],
  providers: [
    BaseRoleService,
    CreateRoleService,
    SetRolePermissionsService,
    DeleteRoleService,
    UpdateRoleService,
    FindAllRolesService,
    FindRoleByIdService,
  ],
  exports: [TypeOrmModule],
})
export class RolesModule {}
