import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';

@Injectable()
export class FindByOwnerHotelsService {
    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepository: IHotelRepository,
    ) {}

    async findByOwner(id: number) {
        return await this.hotelRepository.findHotelByOwner(id);
    }
}
