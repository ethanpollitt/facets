import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { Address, AddressSchema } from './address.schema';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    CommonModule
  ],
  providers: [AddressService],
})
export class AddressModule {}
