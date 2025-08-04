import { Module } from '@nestjs/common';
import { CreateReservationsService } from './services/createReservations.service';
import { ReservationsController } from './infra/reservations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { HOTEL_REPOSITORY_RESERVATION } from './utils/repositoriesTokens';
import { ReservationRepository } from './infra/reservation.repository';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [CreateReservationsService, {
    provide: HOTEL_REPOSITORY_RESERVATION,
    useClass: ReservationRepository,
  }],
})
export class ReservationsModule {}
