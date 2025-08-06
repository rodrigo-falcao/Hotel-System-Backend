import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
// import Redis from 'ioredis';
// import { InjectRedis } from '@nestjs-modules/ioredis';
// import { REPOSITORY_HOTELKEY } from '../utils/redisKey';

@Injectable()
export class RemoveHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository,
    // @InjectRedis() private readonly redis: Redis,
  ) {}

  async remove(id: number) {
    // await this.redis.del(REPOSITORY_HOTELKEY);
    return await this.hotelRepository.deleteHotel(id);
  }
}
