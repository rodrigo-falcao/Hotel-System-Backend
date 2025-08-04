import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository,
  ) {}

  async findById(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepository.updateHotel(id, updateHotelDto);
  }
}
