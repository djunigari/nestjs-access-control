import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CheckPermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { ICreatePermissionDto } from '../dto/create-permission.dto';
import { Action } from '../entities/actions.enum';
import { Subject } from '../entities/subjects.enum';
import { CreatePermissionService } from '../services/CreatePermission.service';

@Controller()
export class CreatePermissionController {
  constructor(private readonly service: CreatePermissionService) {}

  @Post('permission')
  @CheckPermissions([Action.CREATE, Subject.USER])
  async handle(
    @Body() createPermissionDto: ICreatePermissionDto,
    @Res() res: Response,
  ) {
    const result = await this.service.execute(createPermissionDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
