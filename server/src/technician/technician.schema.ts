import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Technician extends Document {
  @Prop({ required: true, unique: true, immutable: true })
  id: number;
  @Prop({ required: true, immutable: true })
  createdOn: Date;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  primaryPhoneNum: string;
  @Prop()
  secondaryPhoneNum: string;
  @Prop()
  email: string;
}

export const TechnicianSchema = SchemaFactory.createForClass(Technician);
