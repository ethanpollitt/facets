import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { Client } from './client.schema';
import { ClientDto } from './client.model';
import { SequenceService } from 'src/common/sequence/sequence.service';

@Injectable()
export class ClientService {
  private sequenceName: string = 'clientId';

  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private seqService: SequenceService
  ) { }

  getAll = async (): Promise<Client[]> => {
    return this.clientModel.find().exec();
  }

  get = async (id: number): Promise<Client> => {
    return this.clientModel.findOne({ id: id }).exec();
  }

  create = async (clientDto: ClientDto): Promise<Client> => {
    // Get new client ID & increment
    clientDto['id'] = await this.seqService.getNext(this.sequenceName);

    // Add created on date
    clientDto['createdOn'] = new Date();

    try {
      const newClient = new this.clientModel(clientDto);
      return await newClient.save();    
    } catch (e) {
      console.error(`CAUGHT EXCEPTION: `, e);
      if (e instanceof Error.ValidationError)
        throw new BadRequestException();
      throw e;
    }
  }

  update = async (id: number, clientDto: ClientDto): Promise<Client> => {
    const updateObj: any = { ...clientDto };
    return this.clientModel.findOneAndUpdate({ id: id }, updateObj, { new: true }).exec();
  }

  delete = async (id: number): Promise<void> => {
    const result = await this.clientModel.deleteOne({ id: id }).exec();
    if (result.deletedCount > 0)
      return;
    throw new HttpException('Exception during deletion', 500);
  }
}
