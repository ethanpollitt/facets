import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true, unique: true, immutable: true })
  id: number;
  @Prop({ required: true, immutable: true })
  createdOn: Date;
  @Prop({ default: false })
  cancelled: boolean;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Client', required: true })
  client: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Technician' })
  technician: Types.ObjectId;
  @Prop({ required: true })
  date: Date;
  @Prop({ default: 60 })
  windowLength: number; // minutes
  @Prop()
  customerNotes: string;
  @Prop()
  techNotes: string;
  @Prop()
  postNotes: string;
  @Prop({ default: [false, null]})
  routed: [boolean, Date|null];
  @Prop({ default: [false, null]})
  started: [boolean, Date|null];
  @Prop({ default: [false, null]})
  completed: [boolean, Date|null];
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
