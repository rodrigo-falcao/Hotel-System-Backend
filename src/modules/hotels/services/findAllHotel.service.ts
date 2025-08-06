import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { REPOSITORY_HOTELKEY } from '../utils/redisKey';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepository: IHotelRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const dataRedis = await this.redis.get(REPOSITORY_HOTELKEY)

    let data: any = null;
    if (dataRedis) {
      data = JSON.parse(dataRedis);
    }

    if (!data) {
      data = await this.hotelRepository.findHotels(offset, limit);
      await this.redis.set(REPOSITORY_HOTELKEY, JSON.stringify(data)); 
    }

    const total = await this.hotelRepository.countHotels();
    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
