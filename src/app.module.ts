import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
// import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 3,
    }]),
    HotelsModule,
    ReservationsModule,
    // RedisModule.forRoot({
    //   type: 'single',
    //   url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    // }),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
