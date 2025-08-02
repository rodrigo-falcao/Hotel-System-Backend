import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { CreateHotelsService } from '../services/createHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { UpdateHotelsService } from '../services/updateHotel.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelsService,
    private readonly findAllHotelsService: FindAllHotelsService,
    private readonly findOneHotelsService: FindOneHotelsService,
    private readonly updateHotelsService: UpdateHotelsService,
    private readonly removeHotelsService: RemoveHotelsService
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllHotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneHotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeHotelsService.remove(+id);
  }
}
