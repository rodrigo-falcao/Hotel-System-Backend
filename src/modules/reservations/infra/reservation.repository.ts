import { Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { CreateReservationDto } from "../domain/dto/create-reservation.dto";

@Injectable()
export class ReservationRepository implements IReservationRepository{
    create(_data: CreateReservationDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
}