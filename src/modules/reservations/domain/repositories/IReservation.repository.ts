import { Reservation } from "@prisma/client";
import { CreateReservationDto } from "../dto/create-reservation.dto";

export interface IReservationRepository {
    create(data: CreateReservationDto): Promise<Reservation>;
    // findAll(): Promise<Reservation[]>;
    // findOne(id: number): Promise<Reservation>;
    // update(id: number, data: any): Promise<Reservation>;
    // remove(id: number): Promise<void>;
}