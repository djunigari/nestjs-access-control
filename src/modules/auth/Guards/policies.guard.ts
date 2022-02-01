import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/entities/user.entity';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policies.interface';
import { Ability } from '@casl/ability';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = await this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, user),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: Ability,
    user: User,
  ) {
    console.log(ability);
    if (typeof handler === 'function') {
      return handler(ability, user);
    }
    return handler.handle(ability, user);
  }
}
