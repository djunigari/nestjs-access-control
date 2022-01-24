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
import { SetUserRolesService } from '../services/SetUserRoles.service';

interface ICreateUserAccessControlListDto {
  roles: [];
}

@Controller()
export class SetUserRolesController {
  constructor(private readonly service: SetUserRolesService) {}

  @Post('/users/roles')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() { roles }: ICreateUserAccessControlListDto,
    @Request() { userId },
    @Res() res: Response,
  ) {
    const result = await this.service.execute({
      userId,
      roles,
    });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
