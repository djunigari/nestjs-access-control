import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { ICreateRoleDto } from '../dto/create-role.dto';
import { CreateRoleService } from '../services/CreateRole.service';

@Controller()
export class CreateRoleController {
  constructor(private readonly service: CreateRoleService) {}

  @Post('role')
  @RequirePermissions(Permission.CREATE_ROLE)
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() createRoleDto: ICreateRoleDto, @Res() res: Response) {
    const result = await this.service.execute(createRoleDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
