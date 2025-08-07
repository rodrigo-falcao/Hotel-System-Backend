import { Test, TestingModule } from "@nestjs/testing";
import { IHotelRepository } from "../domain/repositories/IHotel.repositories";
import { UploadImageHotelService } from "./uploadImageHotel.service";
import { REPOSITORY_TOKEN_HOTEL } from "../utils/repositoriesTokens";
import { NotFoundException } from "@nestjs/common";

let service: UploadImageHotelService;
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
};

jest.mock('fs/promises', () => ({
    stat: jest.fn(),
    unlink: jest.fn(),
}));

describe('UploadImageHotelService', () => {
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            UploadImageHotelService,
            {
            provide: REPOSITORY_TOKEN_HOTEL,
            useValue: {
                findHotelById: jest.fn().mockResolvedValue(createHotelMock),
                updateHotel: jest.fn().mockResolvedValue(createHotelMock),
            },
            },
        ],
        }).compile();

        service = module.get<UploadImageHotelService>(UploadImageHotelService);
        hotelsRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(hotelsRepository).toBeDefined();
    });

    it('should throw NotFoundException if hotel does not exist', async () => {
        (hotelsRepository.findHotelById as jest.Mock).mockResolvedValue(null);

        const result = service.findById('1', 'image.jpg');
        await expect(result).rejects.toThrow(NotFoundException);
    });
});