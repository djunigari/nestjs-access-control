import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserAccessControlListService } from './CreateUserAccessControlList.service';

interface IGetUserAuthInfoRequest extends Request {
  userId: string; // or any other type
}

interface ICreateUserAccessControlListDto {
  permissions: [];
  roles: [];
}

@Controller()
export class CreateUserAccessControlListController {
  constructor(
    private readonly createUserACLService: CreateUserAccessControlListService,
  ) {}

  @Post('/users/acl')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() { permissions, roles }: ICreateUserAccessControlListDto,
    @Req() { userId }: IGetUserAuthInfoRequest,
    @Res() res: Response,
  ) {
    const result = await this.createUserACLService.execute({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
