import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, HttpCode, Patch, Post } from "@nestjs/common";
import { AuthRegisterDTO } from "./domain/dto/authRegister.dto";
import { AuthResetPasswordDTO } from "./domain/dto/authResetPassword.dto";
import { AuthForgotPasswordDTO } from "./domain/dto/authForgotPassword.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    @HttpCode(200)
    login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body);
    }
    
    @Post('register')
    @HttpCode(201)
    register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Patch('reset-password')
    @HttpCode(200)  
    resetPassword(@Body() {token, password}: AuthResetPasswordDTO) {
        return this.authService.resetPassword({token, password});
    }

    @Post('forgot-password')
    @HttpCode(200)
    forgotPassword(@Body() {email }: AuthForgotPasswordDTO) {
        return this.authService.forgotPassword(email);
    }
}