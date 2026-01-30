import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const authKey = 'user';

export const ReqUser = createParamDecorator(
  (prop: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const reqUser = request[authKey];
    return prop ? reqUser[prop] : reqUser;
  },
);
