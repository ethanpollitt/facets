import { MongooseSchemaModel } from '../shared/mongoose.model';
import { RequiredExceptFor } from 'src/types';
import { Client } from '../client/client.model';
import { Technician } from '../technician/technician.model';

export class Appointment extends MongooseSchemaModel {
  client: Client | string;
  technician: Technician | string;
  date: Date;
  windowLength: number;  // minutes
  customerNotes?: string;
  techNotes?: string;
  postNotes?: string;
  cancelled?: boolean; // don't need to pass in
  routed?: [boolean, Date|null];
  started?: [boolean, Date|null];
  completed?: [boolean, Date|null];
  
  public constructor(init: RequiredExceptFor<Appointment, 'customerNotes' | 'techNotes' | 'postNotes' | 'cancelled' | 'routed' | 'started' | 'completed'>) {
    super(init);
    if (init) {
      this.client = init.client;
      this.technician = init.technician;
      this.date = init.date;
      this.windowLength = init.windowLength;

      if (init.customerNotes)
        this.customerNotes = init.customerNotes;
      if (init.techNotes)
        this.techNotes = init.techNotes;
      if (init.postNotes)
        this.postNotes = init.postNotes;
      if (init.cancelled)
        this.cancelled = init.cancelled;
      if (init.routed)
        this.routed = init.routed;
      if (init.started)
        this.started = init.started;
      if (init.completed)
        this.completed = init.completed;
    }
  }

  isEqual(other: Appointment): boolean {
    return Object.keys(this).every(_ => this[_] === other[_]);
  }
}

export enum AppointmentStatus {
  CANCELED = 'Canceled',
  PENDING = 'Pending',
  ROUTED = 'Routed',
  STARTED = 'Started',
  COMPLETED = 'Completed'
}
