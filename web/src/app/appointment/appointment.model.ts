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
      if (typeof init.client === 'string')
        this.client = init.client;
      else
        this.client = new Client(init.client);
       
      if (typeof init.technician === 'string')
        this.technician = init.technician;
      else
        this.technician = new Technician(init.technician);
        
      this.date = new Date(init.date);
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

  get status(): AppointmentStatus {
    if (this.cancelled)
      return AppointmentStatus.CANCELED;
    else if (this.completed[0])
      return AppointmentStatus.COMPLETED;
    else if (this.started[0])
      return AppointmentStatus.STARTED;
    else if (this.routed[0])
      return AppointmentStatus.ROUTED;
    else
      return AppointmentStatus.PENDING;
  }

  public getDisplayStatus = (lowerCase?: boolean): string => {
    return (lowerCase ? this.status.toString().toLowerCase() : this.status.toString());
  }

  public isEqual = (other: Appointment): boolean => {
    return Object.keys(this).every(_ => this[_] === other[_]);
  }

  public toString = (): string => {
    return `${this.client} ${this.date.toISOString()}`;
  }
}

export enum AppointmentStatus {
  CANCELED = 'Canceled',
  PENDING = 'Pending',
  ROUTED = 'Routed',
  STARTED = 'Started',
  COMPLETED = 'Completed'
}
