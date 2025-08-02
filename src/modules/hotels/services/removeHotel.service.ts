import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class RemoveHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepository: IHotelRepository,
  ) {}

  remove(id: number) {
    return this.hotelRepository.deleteHotel(id);
  }
}
