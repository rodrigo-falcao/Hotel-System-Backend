import { CreateHotelsService } from './services/createHotel.service';
import { FindAllHotelsService } from './services/findAllHotel.service';
import { FindOneHotelsService } from './services/findOneHotel.service';
import { HotelsController } from './infra/hotels.controller';
import { Module } from '@nestjs/common';
import { RemoveHotelsService } from './services/removeHotel.service';
import { UpdateHotelsService } from './services/updateHotel.service';

@Module({
  controllers: [HotelsController],
  providers: [
    CreateHotelsService, 
    FindAllHotelsService, 
    FindOneHotelsService, 
    UpdateHotelsService, 
    RemoveHotelsService
  ],
})
export class HotelsModule {}
