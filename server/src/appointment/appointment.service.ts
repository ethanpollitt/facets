import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { SequenceService } from 'src/common/sequence/sequence.service';
import { AppointmentDto } from './appointment.model';
import { Appointment } from './appointment.schema';

@Injectable()
export class AppointmentService {
  private sequenceName: string = 'appointmentId';

  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    private seqService: SequenceService
  ) { }

  getAll = async (): Promise<Appointment[]> => {
    return this.appointmentModel.find()
      .populate('client') // Populate referenced objects
      .populate('technician')
      .exec();
  }

  get = async (id: number): Promise<Appointment> => {
    return this.appointmentModel.findOne({ id: id })
      .populate('client') // Populate referenced objects
      .populate('technician')
      .exec();
  }

  create = async (appointmentDto: AppointmentDto): Promise<Appointment> => {
    // Get new client ID & increment
    appointmentDto['id'] = await this.seqService.getNext(this.sequenceName);

    // Add created on date
    appointmentDto['createdOn'] = new Date();

    try {
      const newAppt = new this.appointmentModel(appointmentDto);
      return await (newAppt.save().then(_ => 
        _.populate('client')
          .populate('technician')
          .execPopulate()
      ));
    } catch (e) {
      console.error(`CAUGHT EXCEPTION: `, e);
      if (e instanceof Error.ValidationError)
        throw new BadRequestException();
      throw e;
    }
  }

  update = async (id: number, appointmentDto: AppointmentDto): Promise<Appointment> => {
    const updateObj: any = { ...appointmentDto };
    return this.appointmentModel.findOneAndUpdate({ id: id }, updateObj, { new: true }).exec().then(_ => 
      _.populate('client')
        .populate('technician')
        .execPopulate()
    );
  }

  delete = async (id: number): Promise<void> => {
    const result = await this.appointmentModel.deleteOne({ id: id }).exec();
    if (result.deletedCount > 0)
      return;
    throw new HttpException('Exception during deletion', 500);
  }
}
