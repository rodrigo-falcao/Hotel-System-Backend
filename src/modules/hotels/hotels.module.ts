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
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UploadImageHotelService } from './services/uploadImageHotel.service';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    UserModule,         
    MulterModule.register({
              storage: diskStorage({
                  destination: './uploads-hotel',
                  filename: (req, file, cb) => {
                      const fileName = `${uuidv4()}${file.originalname}`;
                      return cb(null, fileName);
                  }
              }),
          })],
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
    UploadImageHotelService,
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepository,
    }
  ],
})
export class HotelsModule {}
