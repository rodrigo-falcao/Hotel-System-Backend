import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/modules/auth/auth.service";
import { UserService } from "src/modules/users/user.service";

interface AuthenticatedRequest extends Request {
    user?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor ( 
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const { authorization } = request.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) throw new UnauthorizedException('No token provided'); 

        const token = authorization.split(" ")[1];

        const { valid, decoded } = await this.authService.validateToken(token);

        if (!valid || !decoded ) throw new UnauthorizedException('Invalid or expired token');

        const user = await this.userService.show(Number(decoded.sub));

        if (!user) { throw new UnauthorizedException('User not found'); }

        request.user = user;

        return true;
    }
}