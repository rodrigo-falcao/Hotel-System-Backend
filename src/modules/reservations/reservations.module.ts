import { Module } from '@nestjs/common';
import { CreateReservationsService } from './services/createReservations.service';
import { ReservationsController } from './infra/reservations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { HOTEL_REPOSITORY_RESERVATION } from './utils/repositoriesTokens';
import { REPOSITORY_TOKEN_HOTEL } from '../hotels/utils/repositoriesTokens';
import { ReservationRepository } from './infra/reservation.repository';
import { FindAllReservationsService } from './services/findAllReservations.service';
import { FindByIdReservationService } from './services/findByIdReservation.service';
import { FindByUserReservationService } from './services/findByUserReservation.service';


@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    FindAllReservationsService,
    FindByIdReservationService,
    FindByUserReservationService,
    {
      provide: HOTEL_REPOSITORY_RESERVATION,
      useClass: ReservationRepository,
    },
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: ReservationRepository,
    }
  ],
})
export class ReservationsModule {}
