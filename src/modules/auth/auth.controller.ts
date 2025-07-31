import { AuthLoginDTO } from "./domain/dto/authLogin.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: AuthLoginDTO) {
        return this.authService.login(body);
    }
}