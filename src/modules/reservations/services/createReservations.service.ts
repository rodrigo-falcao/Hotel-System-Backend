import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { IReservationRepository } from '../domain/repositories/IReservation.repository';
import { differenceInDays, parseISO } from 'date-fns';
import { IHotelRepository } from 'src/modules/hotels/domain/repositories/IHotel.repositories';
import { ReservationStatus, type ReservationStatus as ReservationStatusType } from '@prisma/client';
import { HOTEL_REPOSITORY_RESERVATION } from '../utils/repositoriesTokens';
import { REPOSITORY_TOKEN_HOTEL } from 'src/modules/hotels/utils/repositoriesTokens';


@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_RESERVATION) 
    private readonly reservationRepository: IReservationRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository,
  ) {}
  
  async create(id:number, data: CreateReservationDto) {
    const checkinDate = parseISO(data.checkIn);
    const checkoutDate = parseISO(data.checkOut);
    const daysOfStay = differenceInDays(checkoutDate, checkinDate);

    if( checkinDate >= checkoutDate){
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    const hotel = await this.hotelRepository.findHotelById(data.hotelId);

    if (!hotel) {
      throw new BadRequestException('Hotel not found');
    }

    if(typeof hotel.price !== 'number' || hotel.price <= 0) {
      throw new BadRequestException('Invalid hotel price');
    }

    const total = hotel.price * daysOfStay;

    const newReservation = {
      ...data,
      checkIn: checkinDate.toISOString(),
      checkOut: checkoutDate.toISOString(),
      total,
      userId: id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      status: ReservationStatus.PENDING as ReservationStatusType
    };

    return this.reservationRepository.create(newReservation);

  }

}
