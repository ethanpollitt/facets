import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { ClientModule } from './client/client.module';
import { TechnicianModule } from './technician/technician.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/facets'),
    ClientModule,
    TechnicianModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
