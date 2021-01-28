import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { SequenceService } from 'src/common/sequence/sequence.service';
import { AddressDto } from './address.model';
import { Address } from './address.schema';

@Injectable()
export class AddressService {
  private sequenceName: string = 'addressId';
  
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private seqService: SequenceService
  ) { }

  getAll = async (): Promise<Address[]> => {
    return this.addressModel.find().exec();
  }

  get = async (id: number): Promise<Address> => {
    return this.addressModel.findOne({ id: id }).exec();
  }

  create = async (addressDto: AddressDto): Promise<Address> => {
    // Get new client ID & increment
    addressDto['id'] = await this.seqService.getNext(this.sequenceName);

    // Add created on date
    addressDto['createdOn'] = new Date();

    try {
      const newAddress = new this.addressModel(addressDto);
      return await newAddress.save();
    } catch (e) {
      console.log(`CAUGHT EXCEPTION: ${e.message}`);
      if (e instanceof Error.ValidationError)
        throw new BadRequestException();
      throw e;
    }
  }

  update = async (id: number, addressDto: AddressDto): Promise<Address> => {
    return this.addressModel.findOneAndUpdate({ id: id }, addressDto, { new: true }).exec();
  }

  delete = async (id: number): Promise<void> => {
    const result = await this.addressModel.deleteOne({ id: id }).exec();
    if (result.deletedCount > 0)
      return;
    throw new HttpException('Exception during deletion', 500);
  }
}
