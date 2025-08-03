import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepository: IHotelRepository,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const data = await this.hotelRepository.findHotels(offset, limit);
    const total = await this.hotelRepository.countHotels();
    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
