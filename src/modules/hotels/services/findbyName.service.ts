import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindByNameHotelsService {
    constructor(
        @Inject(REPOSITORY_TOKEN_HOTEL)
        private readonly hotelRepository: IHotelRepository,
    ) {}

    async findByName(name: string) {
        return await this.hotelRepository.findHotelByName(name);
    }
}
