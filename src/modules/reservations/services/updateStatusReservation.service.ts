import { Inject, Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { HOTEL_REPOSITORY_RESERVATION } from "../utils/repositoriesTokens";
import { ReservationStatus } from "@prisma/client";

@Injectable()
export class UpdateStatusReservationService {
    constructor(
        @Inject(HOTEL_REPOSITORY_RESERVATION) 
        private readonly reservationRepository: IReservationRepository,
    ) {}

    async updateStatus(id: number, status: ReservationStatus) {
        return await this.reservationRepository.updateStatus(id, status);
    }
}