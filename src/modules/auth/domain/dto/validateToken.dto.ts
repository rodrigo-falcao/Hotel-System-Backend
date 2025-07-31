import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export interface JwtPayload {
    name: string;
    useremail: string;
    iat?: number;
    expiresIn?: number;
    issuer?: string;
    sub: number;
    audience?: string;
}

export class ValidationTokenDTO {
    @IsBoolean()
    @IsNotEmpty()
    valid: boolean;

    decoded?: JwtPayload;

    @IsNotEmpty()
    @IsOptional()
    message?: string;
}