import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Request } from "express";

type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
    [key: string]: unknown;
};

export const User = createParamDecorator((filter: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: UserType }>();
    const user = request.user;

    if (!user) {
        throw new NotFoundException("User not found!");
    }

    if (filter) {
        if (!user[filter]) {
            throw new NotFoundException(`User property '${filter}' not found!`);
        }
        return user[filter];
    }
    return user;
});