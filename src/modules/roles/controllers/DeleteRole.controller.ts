import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DeleteRoleService } from '../services/DeleteRole.service';

@Controller()
export class DeleteRoleController {
  constructor(private readonly service: DeleteRoleService) {}

  @Delete('role/:id')
  @HttpCode(HttpStatus.OK)
  async execute(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    return res.json(result);
  }
}
