import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientSchema, Client } from './client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    CommonModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
