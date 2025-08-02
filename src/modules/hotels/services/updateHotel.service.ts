import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepository: IHotelRepository,
  ) {}

  async findById(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepository.updateHotel(id, updateHotelDto);
  }
}
