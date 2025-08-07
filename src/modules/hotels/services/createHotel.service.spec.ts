import { Test, TestingModule } from "@nestjs/testing";
import { CreateHotelsService } from "./createHotel.service";
import { REPOSITORY_TOKEN_HOTEL } from "../utils/repositoriesTokens";
import { IHotelRepository } from "../domain/repositories/IHotel.repositories";

let service: CreateHotelsService;
let hotelsRepository: IHotelRepository;

const createHotelMock = {
  id: 1,
  name: "Hotel Test",
  description: "Description Test",
  image: "Image-Test.jpg",
  price: 100,
  address: "Address Test",
  ownerId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const userIdMock = 1

describe('CreateHotelService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHotelsService,
        {
          provide: REPOSITORY_TOKEN_HOTEL,
          useValue: {
            createHotel: jest.fn().mockResolvedValue(createHotelMock),
          },
        },
      ],
    }).compile();

    service = module.get<CreateHotelsService>(CreateHotelsService);
    hotelsRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(hotelsRepository).toBeDefined();
  });

  it('should create a hotel successfully', async () => {
    const result = await service.execute(createHotelMock, userIdMock);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(hotelsRepository.createHotel).toHaveBeenCalledWith(createHotelMock, userIdMock);
    expect(result).toEqual(createHotelMock);
  });
  
});