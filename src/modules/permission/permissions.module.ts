import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission.entity';
import { CreatePermissionController } from './CreatePermission.controller';
import { CreatePermissionService } from './CreatePermission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [CreatePermissionService],
  controllers: [CreatePermissionController],
  exports: [TypeOrmModule],
})
export class PermissionsModule {}
