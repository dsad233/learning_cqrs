import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestToken = createParamDecorator(
  async (prop: string, context: ExecutionContext) => {
    const headers = context.switchToHttp().getRequest().headers;
    return headers[prop];
  },
);
