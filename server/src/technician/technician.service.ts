import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { SequenceService } from 'src/common/sequence/sequence.service';
import { TechnicianDto } from './technician.model';
import { Technician } from './technician.schema';

@Injectable()
export class TechnicianService {
  private sequenceName: string = 'techId';

  constructor(
    @InjectModel(Technician.name) private technicianModel: Model<Technician>,
    private seqService: SequenceService
  ) { }

  getAll = async (): Promise<Technician[]> => {
    return this.technicianModel.find().exec();
  }

  get = async (id: number): Promise<Technician> => {
    return this.technicianModel.findOne({ id: id }).exec();
  }

  create = async (technicianDto: TechnicianDto): Promise<Technician> => {
    // Get new client ID & increment
    technicianDto['id'] = await this.seqService.getNext(this.sequenceName);

    // Add created on date
    technicianDto['createdOn'] = new Date();

    try {
      const newTech = new this.technicianModel(technicianDto);
      return await newTech.save();    
    } catch (e) {
      console.error(`CAUGHT EXCEPTION: `, e);
      if (e instanceof Error.ValidationError)
        throw new BadRequestException();
      throw e;
    }
  }

  update = async (id: number, clientDto: TechnicianDto): Promise<Technician> => {
    const newTech = new this.technicianModel(clientDto);
    return this.technicianModel.findOneAndUpdate({ id: id }, newTech, { new: true }).exec();
  }

  delete = async (id: number): Promise<void> => {
    const result = await this.technicianModel.deleteOne({ id: id }).exec();
    if (result.deletedCount > 0)
      return;
    throw new HttpException('Exception during deletion', 500);
  }
}
