import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "src/shared/decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor (private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request & { user?: { role?: Role } }>();
        const { user } = request;
        
        if (!user) {
            return false;
        }

        return requiredRoles.some((role) => user.role === role);
    }
}