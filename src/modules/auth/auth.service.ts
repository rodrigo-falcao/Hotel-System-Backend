import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    
    generateJwtToken(user: User) {
        const payload = { sub: user.id, name: user.name };
        const options = { 
            expiresIn: '1h',
            issuer: 'dnc_hotel',
            audience: 'users',
        };
        return {accessToken: this.jwtService.sign(payload, options)};
    }
}