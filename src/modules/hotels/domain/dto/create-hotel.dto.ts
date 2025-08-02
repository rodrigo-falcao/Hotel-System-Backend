import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateHotelDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    image: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    address: string;

    @IsNumber()
    @IsOptional()
    ownerId: number;
}
