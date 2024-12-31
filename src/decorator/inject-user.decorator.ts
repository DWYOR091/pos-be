import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Injectuser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.body.user = req.user;
    return req.body;
  },
);
