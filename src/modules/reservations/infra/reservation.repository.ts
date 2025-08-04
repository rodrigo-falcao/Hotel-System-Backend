import { Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Reservation } from "@prisma/client";

@Injectable()
export class ReservationRepository implements IReservationRepository{
    constructor(private readonly prisma: PrismaService){}

    create(data: any): Promise<Reservation> {
        return this.prisma.reservation.create({ data });
    }
}