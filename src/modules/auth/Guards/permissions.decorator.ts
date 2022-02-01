import { SetMetadata } from '@nestjs/common';
import { Action } from 'src/modules/permissions/entities/actions.enum';
import { Subject } from 'src/modules/permissions/entities/subjects.enum';

export type RequiredPermission = [Action, Subject];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (...params: RequiredPermission[]) =>
  SetMetadata(PERMISSION_CHECKER_KEY, params);
