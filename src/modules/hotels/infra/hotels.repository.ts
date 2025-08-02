import { CreateHotelDto } from "../domain/dto/create-hotel.dto";
import { Hotel } from "@prisma/client";
import { IHotelRepository } from "../domain/repositories/IHotel.repositories";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { UpdateHotelDto } from "../domain/dto/update-hotel.dto";

@Injectable()
export class HotelsRepository implements IHotelRepository {
    constructor(private readonly prisma: PrismaService) {}

    createHotel(data: CreateHotelDto): Promise<Hotel> {
        return this.prisma.hotel.create({ data });
    }

    findHotels(): Promise<Hotel[]> {
        return this.prisma.hotel.findMany();
    }

    async findHotelById(id: number): Promise<Hotel | null> {
        console.log(`Finding hotel with ID: ${id}`);
        return this.prisma.hotel.findUnique({ where: { id } });
    }

    async findHotelByName(name: string): Promise<Hotel | null> {
        console.log(`Finding hotel with name: ${name}`);
        return this.prisma.hotel.findFirst({ where: { name } });
    }

    updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
        return this.prisma.hotel.update({ where: { id }, data });
    }

    deleteHotel(id: number): Promise<Hotel> {
        return this.prisma.hotel.delete({ where: { id } });
    }
}
