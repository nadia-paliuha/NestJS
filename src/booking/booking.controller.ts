import { Controller, Get, Post, Put, Delete, Body, Query, Param, UsePipes, ValidationPipe, UseGuards, Req, ParseIntPipe, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('available')
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkAvailability(@Query() dto: CheckAvailabilityDto) {
    return this.bookingService.getAvailableTables(dto);
  }

 @Post('reserve/:tableId/user')
  @UseGuards(JwtAuthGuard)
  async reserve(
    @Req() req,
    @Param('tableId', ParseIntPipe) tableId: number, 
    @Body() dto: CreateBookingDto
  ) {

    const userId = req.user.id; 
    dto.tableId = tableId;  
    
    return this.bookingService.createBooking(userId, dto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll(
    @Query('status') status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
  ) {
    return this.bookingService.findAll(status);
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  async getMyBookings(
    @Req() req: any,
    @Query('status') status?: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED',
  ) {
    const userId = req.user.id;
    return this.bookingService.findByUser(userId, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.bookingService.findOne(id);
  }

  @Patch('update-status/:id')
  async updateBookingStatus(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateStatus(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  delete(@Param('id') id: number) {
    return this.bookingService.delete(id);
  }
}
