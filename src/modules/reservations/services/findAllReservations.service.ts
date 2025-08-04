import { Inject, Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { HOTEL_REPOSITORY_RESERVATION } from "../utils/repositoriesTokens";

@Injectable()
export class FindAllReservationsService {
    constructor(
        @Inject(HOTEL_REPOSITORY_RESERVATION) 
        private readonly reservationRepository: IReservationRepository,
    ) {}

    async findAll() {
        return this.reservationRepository.findAll();
    }
}