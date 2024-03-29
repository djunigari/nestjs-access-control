import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IUpdatePermissionDto } from '../dto/update-permission.dto';
import { UpdatePermissionService } from '../services/UpdatePermission.service';

@Controller()
export class UpdatePermissionController {
  constructor(private readonly service: UpdatePermissionService) {}

  @Patch('permission/:id')
  @HttpCode(HttpStatus.CREATED)
  async execute(
    @Param('id') id: string,
    @Body() updatePermissionDto: IUpdatePermissionDto,
    @Res() res: Response,
  ) {
    const result = await this.service.execute(id, updatePermissionDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
