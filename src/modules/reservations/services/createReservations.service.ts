import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { IReservationRepository } from '../domain/repositories/IReservation.repository';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject('HOTEL_REPOSITORY_RESERVATION') private readonly reservationRepository: IReservationRepository,
  ) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create(createReservationDto);
  }

}
