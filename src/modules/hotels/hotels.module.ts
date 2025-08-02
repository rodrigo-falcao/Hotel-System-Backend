import { CreateHotelsService } from './services/createHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { HotelsController } from './infra/hotels.controller';
import { Module } from '@nestjs/common';
import { RemoveHotelsService } from './services/removeHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';
import { HotelsRepository } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesTokens';

@Module({
  imports: [PrismaModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService, 
    FindAllHotelsService, 
    FindOneHotelsService, 
    UpdateHotelsService, 
    RemoveHotelsService,
    HotelsRepository, 
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepository,
    }
  ],
})
export class HotelsModule {}
