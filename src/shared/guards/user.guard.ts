import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class UserMathGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request & { user?: { id: number } }>();
        const id = request.params.id;
        const user = request.user;

        if (!user || user.id !== Number(id)) {
            throw new UnauthorizedException("You do not have permission to access this resource.");
        }

        return true;
        
    }
}