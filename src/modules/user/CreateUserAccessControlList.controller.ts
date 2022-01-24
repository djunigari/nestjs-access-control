import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserAccessControlListService } from './CreateUserAccessControlList.service';

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
    @Request() { userId },
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
