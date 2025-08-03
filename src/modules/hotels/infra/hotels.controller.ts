import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards, Param, UploadedFile, MaxFileSizeValidator, ParseFilePipe, BadRequestException, UseInterceptors } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { CreateHotelsService } from '../services/createHotel.service';
import { FindAllHotelsService } from '../services/findAllHotel.service';
import { FindByNameHotelsService } from '../services/findbyName.service';
import { FindByOwnerHotelsService } from '../services/findbyOwner.service';
import { FindOneHotelsService } from '../services/findOneHotel.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { RemoveHotelsService } from '../services/removeHotel.service';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { UpdateHotelsService } from '../services/updateHotel.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { UploadImageHotelService } from '../services/uploadImageHotel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationInterceptor } from 'src/shared/interceptors/filevalidation.interceptor';

@UseGuards(AuthGuard, RoleGuard)
@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelsService,
    private readonly findAllHotelsService: FindAllHotelsService,
    private readonly findOneHotelsService: FindOneHotelsService,
    private readonly updateHotelsService: UpdateHotelsService,
    private readonly removeHotelsService: RemoveHotelsService,
    private readonly findByNameHotelsService: FindByNameHotelsService,
    private readonly findByOwnerHotelsService: FindByOwnerHotelsService,
    private readonly uploadImageHotelService: UploadImageHotelService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@User('id') id: number, @Body() createHotelDto: CreateHotelDto) {
    return this.createHotelService.execute(createHotelDto, id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.findAllHotelsService.findAll(Number(page), Number(limit));
  }
  
  @Roles(Role.ADMIN, Role.USER)
  @Get('name')
  findByName(@Query('name') name: string) {
    return this.findByNameHotelsService.findByName(name);
  }
  
  @Roles(Role.ADMIN)
  @Get('owner')
  findByOwner(@User('id') id: number) {
    return this.findByOwnerHotelsService.findByOwner(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@ParamId('id') id: number) {
    return this.findOneHotelsService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image'), FileValidationInterceptor)
  @Patch('image/:hotelId')
  uploadImage(
    @Param('hotelId') id: string, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), 
        ],
      })
    ) image: Express.Multer.File) {
    if (!image) {
        throw new BadRequestException('Arquivo não enviado!');
    }
    if (!image.mimetype.startsWith('image/')) {
        throw new BadRequestException('O arquivo enviado não é uma imagem!');
    }
    return this.uploadImageHotelService.findById(id, image.filename);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@ParamId('id') id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotelsService.findById(id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@ParamId('id') id: number) {
    return this.removeHotelsService.remove(id);
  }
}
