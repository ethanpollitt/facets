import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document  {
  @Prop({ required: true, unique: true, immutable: true })
  id: number;
  @Prop({ required: true, immutable: true })
  createdOn: Date;
  @Prop({ required: true })
  streetAddr: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  state: string;
  @Prop({ required: true })
  zip: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
