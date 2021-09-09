import { Controller, Get, Param, Put, Post, NotFoundException, ParseIntPipe, Body, Delete, ValidationPipe, UsePipes } from '@nestjs/common';

import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './appointment.model';
import { Appointment } from './appointment.schema';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  getAppointments(): Promise<Appointment[]> {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  getAppointment(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    const appt = this.appointmentService.get(id);
    if ([null, undefined].includes(appt))
      throw new NotFoundException('Invalid user ID');
    return appt;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createAppointment(@Body() appointmentDto: AppointmentDto): Promise<Appointment> {
    return this.appointmentService.create(appointmentDto);
  }

  @Put(':id')
  updateAppointment(@Param('id', ParseIntPipe) id: number, @Body() appointmentDto: AppointmentDto): Promise<Appointment> {
    return this.appointmentService.update(id, appointmentDto);
  }

  @Delete(':id')
  deleteAppointment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appointmentService.delete(id);
  }
}
