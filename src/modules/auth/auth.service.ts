import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role, User } from "@prisma/client";
import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { UserService } from "../users/user.service";
import { CreateUserDTO } from "../users/domain/dto/createUser.dto";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { AuthResetPasswordDTO } from "./domain/dto/authResetPassword.dto";
import { ValidationTokenDTO } from "./domain/dto/validateToken.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) {}

    generateJwtToken(user: User) {
        const payload = { sub: user.id, name: user.name };
        const options = { 
            expiresIn: '1h',
            issuer: 'dnc_hotel',
            audience: 'users',
        };
        return {accessToken: this.jwtService.sign(payload, options)};
    }

    async login({email, password}: AuthLoginDTO) {
        const user = await this.userService.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }   
        return this.generateJwtToken(user);
    }

    async register(body: AuthRegisterDTO) {
        const newUser: CreateUserDTO = {
            email: body.email!,
            name: body.name!,
            password: body.password!,
            role: body.role ?? Role.USER
        };
        const user = await this.userService.createUser(newUser);
        return this.generateJwtToken(user);
    }


    async resetPassword({ token, password }: AuthResetPasswordDTO) {
        const {valid, decoded } = await this.validateToken(token);

        if (!valid || !decoded) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        const user = await this.userService.updateUser(Number(decoded.sub), { password });
        return this.generateJwtToken(user);
    }

    private async validateToken(token: string): Promise<ValidationTokenDTO> {
        try {
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'dnc_hotel',
                audience: 'users',
            });
            return { valid: true, decoded };
        } catch (error) {
            const err = error as Error;
            return { valid: false, message: err.message };
        }
    }
}

