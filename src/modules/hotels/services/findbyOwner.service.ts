import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindByOwnerHotelsService {
    constructor(
        @Inject(REPOSITORY_TOKEN_HOTEL)
        private readonly hotelRepository: IHotelRepository,
    ) {}

    async findByOwner(id: number) {
        return await this.hotelRepository.findHotelByOwner(id);
    }
}
