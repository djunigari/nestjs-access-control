import { Controller, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserService } from './CreateUser.service';

@Controller()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('users')
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const result = await this.createUserService.execute({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
