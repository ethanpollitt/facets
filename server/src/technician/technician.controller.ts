import { Controller, Get, Param, Put, Post, NotFoundException, ParseIntPipe, Body, Delete, ValidationPipe, UsePipes } from '@nestjs/common';

import { TechnicianDto } from './technician.model';
import { Technician } from './technician.schema';
import { TechnicianService } from './technician.service';

@Controller('technicians')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Get()
  getTechnicians(): Promise<Technician[]> {
    return this.technicianService.getAll();
  }

  @Get(':id')
  getTechnician(@Param('id', ParseIntPipe) id: number): Promise<Technician> {
    const technician = this.technicianService.get(id);
    if ([null, undefined].includes(technician))
      throw new NotFoundException('Invalid user ID');
    return technician;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createTechnician(@Body() technicianDto: TechnicianDto): Promise<Technician> {
    return this.technicianService.create(technicianDto);
  }

  @Put(':id')
  updateTechnician(@Param('id', ParseIntPipe) id: number, @Body() technicianDto: TechnicianDto): Promise<Technician> {
    return this.technicianService.update(id, technicianDto);
  }

  @Delete(':id')
  deleteTechnician(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.technicianService.delete(id);
  }
}
