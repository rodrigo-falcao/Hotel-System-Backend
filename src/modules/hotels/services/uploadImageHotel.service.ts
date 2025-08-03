import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class UploadImageHotelService {
    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepository: IHotelRepository,
    ) {}

    async findById(id: string, imageFileName: string) {
        const directory = join(__dirname, '../', '../', '../', '../', 'uploads-hotel');
        const hotel = await this.hotelRepository.findHotelById(Number(id));

        if (!hotel) {
            throw new NotFoundException(`Hotel with ID ${id} not found`);
        }

        if (hotel.image) {
            const hotelImageFilePath = join(directory, hotel.image);
            try {
                await stat(hotelImageFilePath);
                await unlink(hotelImageFilePath);
            } catch {
                // Arquivo não existe, ignora o erro
            }
        }
        return await this.hotelRepository.updateHotel(Number(id), { image: imageFileName });
    }
}
