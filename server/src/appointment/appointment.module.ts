import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from '../common/common.module';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentService } from './appointment.service';
import { Client, ClientSchema } from 'src/client/client.schema';
import { Technician, TechnicianSchema } from 'src/technician/technician.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }, { name: Client.name, schema: ClientSchema }, { name: Technician.name, schema: TechnicianSchema }]),
    CommonModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
