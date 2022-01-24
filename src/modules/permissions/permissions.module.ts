import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePermissionController } from './controllers/CreatePermission.controller';
import { DeletePermissionController } from './controllers/DeletePermission.controller';
import { FindAllPermissionsController } from './controllers/FindAllPermissions.controller';
import { FindPermissionByIdController } from './controllers/FindPermissionById.controller';
import { UpdatePermissionController } from './controllers/UpdatePermission.controller';
import { Permission } from './entities/permission.entity';
import { BasePermissionService } from './services/BasePermission.service';
import { CreatePermissionService } from './services/CreatePermission.service';
import { DeletePermissionService } from './services/DeletePermission.service';
import { FindAllPermissionsService } from './services/FindAllPermissions.service';
import { FindPermissionByIdService } from './services/FindPermissionById.service';
import { UpdatePermissionService } from './services/UpdatePermission.service';
@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [
    CreatePermissionController,
    FindAllPermissionsController,
    FindPermissionByIdController,
    UpdatePermissionController,
    DeletePermissionController,
  ],
  providers: [
    BasePermissionService,
    CreatePermissionService,
    FindAllPermissionsService,
    FindPermissionByIdService,
    UpdatePermissionService,
    DeletePermissionService,
  ],
  exports: [TypeOrmModule],
})
export class PermissionsModule {}
