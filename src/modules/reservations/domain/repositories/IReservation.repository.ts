import { Reservation } from "@prisma/client";
import { CreateReservationDto } from "../dto/create-reservation.dto";

export interface IReservationRepository {
    create(data: CreateReservationDto): Promise<Reservation>;

}