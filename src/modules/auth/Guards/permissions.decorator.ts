import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Action } from 'src/modules/permissions/entities/actions.enum';
import { PermissionObjectType } from '../casl/casl-ability.factory';

export type RequiredPermission = [Action, PermissionObjectType];
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
export const CheckPermissions = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_CHECKER_KEY, params);
