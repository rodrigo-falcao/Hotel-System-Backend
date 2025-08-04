import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { FindByIdReservationService } from '../services/findByIdReservation.service';
import { FindByUserReservationService } from '../services/findByUserReservation.service';
// import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByIdReservationService,
    private readonly findByUserReservationsService: FindByUserReservationService,
  ) {}
  @Post()
  create(@User('id') id: number, @Body() Body: CreateReservationDto) {
    return this.createReservationsService.create(id, Body);
  }

  @Get()
  findAll() {
    return this.findAllReservationsService.findAll();
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationsService.findByUser(id);
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this.findByIdReservationsService.findById(id);
  }



  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
  //   return this.createReservationsService.update(+id, updateReservationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.createReservationsService.remove(+id);
  // }
}
