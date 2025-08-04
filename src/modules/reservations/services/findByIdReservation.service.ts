import { Inject, Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { HOTEL_REPOSITORY_RESERVATION } from "../utils/repositoriesTokens";

@Injectable()
export class FindByIdReservationService {
    constructor(
        @Inject(HOTEL_REPOSITORY_RESERVATION) 
        private readonly reservationRepository: IReservationRepository,
    ) {}

    async findById(id: number) {
        return await this.reservationRepository.findById(id);
    }
}