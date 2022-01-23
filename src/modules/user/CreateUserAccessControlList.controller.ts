import { Controller, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserAccessControlListService } from './CreateUserAccessControlList.service';

export interface IGetUserAuthInfoRequest extends Request {
  userId: string; // or any other type
}

@Controller()
export class CreateUserAccessControlListController {
  constructor(
    private readonly createUserACLService: CreateUserAccessControlListService,
  ) {}

  @Post('/users/acl')
  async handle(request: IGetUserAuthInfoRequest, response: Response) {
    const { permissions, roles } = request.body;
    const { userId } = request;

    const result = await this.createUserACLService.execute({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
