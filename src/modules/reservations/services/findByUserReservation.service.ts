import { Inject, Injectable } from "@nestjs/common";
import { IReservationRepository } from "../domain/repositories/IReservation.repository";
import { HOTEL_REPOSITORY_RESERVATION } from "../utils/repositoriesTokens";

@Injectable()
export class FindByUserReservationService {
    constructor(
        @Inject(HOTEL_REPOSITORY_RESERVATION) 
        private readonly reservationRepository: IReservationRepository,
    ) {}

    async findByUser(userId: number) {
        return await this.reservationRepository.findByUser(userId);
    }
}