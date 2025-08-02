import { AuthModule } from '../auth/auth.module';
import { CreateHotelsService } from './services/createHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindByNameHotelsService } from './services/findbyName.service';
import { FindByOwnerHotelsService } from './services/findbyOwner.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesTokens';
import { HotelsController } from './infra/hotels.controller';
import { HotelsRepository } from './infra/hotels.repository';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RemoveHotelsService } from './services/removeHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService, 
    FindAllHotelsService, 
    FindOneHotelsService, 
    UpdateHotelsService, 
    RemoveHotelsService,
    FindByNameHotelsService,
    FindByOwnerHotelsService,
    HotelsRepository, 
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepository,
    }
  ],
})
export class HotelsModule {}
