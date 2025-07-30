import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express"; 

export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context?.switchToHttp().getRequest<Request>();
    const id = request?.params.id;

    return Number(id);
});

