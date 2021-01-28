import { Controller, Get, Param, Put, Post, NotFoundException, ParseIntPipe, Body, Delete, ValidationPipe, UsePipes } from '@nestjs/common';

import { ClientService } from './client.service';
import { Client } from './client.schema';
import { ClientDto } from './client.model';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getClients(): Promise<Client[]> {
    return this.clientService.getAll();
  }

  @Get(':id')
  getClient(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    const client = this.clientService.get(id);
    if ([null, undefined].includes(client))
      throw new NotFoundException('Invalid user ID');
    return client;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createClient(@Body() clientDto: ClientDto): Promise<Client> {
    return this.clientService.create(clientDto);
  }

  @Put(':id')
  updateClient(@Param('id', ParseIntPipe) id: number, @Body() clientDto: ClientDto): Promise<Client> {
    return this.clientService.update(id, clientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientService.delete(id);
  }
}
