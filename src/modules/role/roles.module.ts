import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role.entity';
import { PermissionsModule } from '../permission/permissions.module';
import { CreateRoleController } from './CreateRole.controller';
import { CreateRoleService } from './CreateRole.service';
import { CreateRolePermissionController } from './CreateRolePermission.controller';
import { CreateRolePermissionService } from './CreateRolePermission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), PermissionsModule],
  providers: [CreateRoleService, CreateRolePermissionService],
  controllers: [CreateRoleController, CreateRolePermissionController],
  exports: [TypeOrmModule],
})
export class RolesModule {}
