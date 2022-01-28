import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Action } from 'src/modules/permissions/entities/actions.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { FindAllPermissionsOfUserByIdService } from 'src/modules/users/services/FindAllPermissionsOfUserById.service';
import { Subject } from 'src/modules/permissions/entities/subjects.enum';

export type PermissionObjectType = any;
export type AppAbility = Ability<[Action, PermissionObjectType]>;
interface CaslPermission {
  action: Action;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: Subject;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(
    private readonly findAllPermissionsOfUserService: FindAllPermissionsOfUserByIdService,
  ) {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: Permission[] =
      await this.findAllPermissionsOfUserService.execute(user.id);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: p.action,
      subject: p.subject,
    }));

    return new Ability<[Action, PermissionObjectType]>(caslPermissions);
  }
}
