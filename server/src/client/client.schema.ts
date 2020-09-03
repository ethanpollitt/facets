import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true, unique: true, immutable: true })
  id: number;
  @Prop({ required: true, immutable: true })
  createdOn: Date;
  @Prop({ required: true })
  phoneNum: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  streetAddr: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zip: string;
  @Prop({ required: true, default: false})
  squareCust: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

