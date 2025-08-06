import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
// import { InjectRedis } from '@nestjs-modules/ioredis';
// import Redis from 'ioredis';
// import { REPOSITORY_HOTELKEY } from '../utils/redisKey';

@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository,
    // @InjectRedis() private readonly redis: Redis,
  ) {}

  async execute(createHotel: CreateHotelDto, id: number) {
    // await this.redis.del(REPOSITORY_HOTELKEY);
    return await this.hotelRepository.createHotel(createHotel, id);
  }
}
