import { Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { HotelsRepository } from '../infra/hotels.repository';

@Injectable()
export class UpdateHotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelsRepository.updateHotel(id, updateHotelDto);
  }
}