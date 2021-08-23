import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { TechnicianController } from './technician.controller';
import { Technician, TechnicianSchema } from './technician.schema';
import { TechnicianService } from './technician.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Technician.name, schema: TechnicianSchema }]),
    CommonModule
  ],
  controllers: [TechnicianController],
  providers: [TechnicianService],
})
export class TechnicianModule {}
