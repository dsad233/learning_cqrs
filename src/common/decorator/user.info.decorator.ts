import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const authToken = 'user';

export const ReqUser = createParamDecorator(
  (prop: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const reqUser = request[authToken];
    return reqUser[prop] != null ? reqUser[prop] : reqUser;
  },
);
