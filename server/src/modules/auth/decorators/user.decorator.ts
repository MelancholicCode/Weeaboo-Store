import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role, User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof (User & { roles: Role[] }), ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
