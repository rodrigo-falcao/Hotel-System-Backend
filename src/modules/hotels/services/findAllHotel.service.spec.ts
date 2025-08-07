import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepository } from "../domain/repositories/IHotel.repositories";
import { FindAllHotelsService } from "./findAllHotel.service";
import { REPOSITORY_TOKEN_HOTEL } from "../utils/repositoriesTokens";
import { Hotel } from "@prisma/client";

let service: FindAllHotelsService;
let hotelsRepository: IHotelRepository;

const createHotelMock: Hotel = {
  id: 1,
  name: "Hotel Test",
  description: "Description Test",
  image: "Image-Test.jpg",
  price: 100,
  address: "Address Test",
  ownerId: 1,
  createdAt: new Date('2026-07-28T10:41:18.753Z'),
  updatedAt: new Date('2026-07-28T10:41:18.753Z'),
}

describe('FindAllHotelsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllHotelsService,
        {
          provide: REPOSITORY_TOKEN_HOTEL,
          useValue: {
            findHotels: jest.fn(),
            countHotels: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAllHotelsService>(FindAllHotelsService);
    hotelsRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(hotelsRepository).toBeDefined();
  });

  it('should return paginated hotels', async () => {
    const page = 1;
    const limit = 10;

    jest.spyOn(hotelsRepository, 'findHotels').mockResolvedValue([createHotelMock]);
    jest.spyOn(hotelsRepository, 'countHotels').mockResolvedValue(1);

    const result = await service.findAll(page, limit);

    jest.spyOn(hotelsRepository, 'findHotels' as const).mockResolvedValue([createHotelMock]);
    jest.spyOn(hotelsRepository, 'countHotels' as const).mockResolvedValue(1);
    expect(result).toEqual({
      total: 1,
      page,
      per_page: limit,
      data: [createHotelMock],
    });
  });

  
})