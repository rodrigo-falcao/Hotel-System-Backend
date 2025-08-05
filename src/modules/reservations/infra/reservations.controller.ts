import { Controller, Post, Body, UseGuards, Param, Get, Patch } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { FindAllReservationsService } from '../services/findAllReservations.service';
import { FindByIdReservationService } from '../services/findByIdReservation.service';
import { FindByUserReservationService } from '../services/findByUserReservation.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateStatusReservationService } from '../services/updateStatusReservation.service';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
// import { UpdateReservationDto } from '../domain/dto/update-reservation.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findAllReservationsService: FindAllReservationsService,
    private readonly findByIdReservationsService: FindByIdReservationService,
    private readonly findByUserReservationsService: FindByUserReservationService,
    private readonly updateStatusReservationService: UpdateStatusReservationService,
  ) {}

  @Roles(Role.USER)
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
  findOne(@Param('id') id: string) {
    return this.findByIdReservationsService.findById(Number(id));
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  updateStatus(
    @ParamId() id: number, 
    @Body('status') status: ReservationStatus) {
    return this.updateStatusReservationService.updateStatus(id, status);
  }
}
