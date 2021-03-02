import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from 'src/address/address.schema';
import { ClientType } from './client.model';

@Schema()
export class Client extends Document {
  @Prop({ required: true, unique: true, immutable: true })
  id: number;
  @Prop({ required: true, immutable: true })
  createdOn: Date;
  @Prop({ required: true, enum: Object.values(ClientType), default: ClientType.RES })
  type: string;
  @Prop({ required: true })
  primaryPhoneNum: string;
  @Prop()
  secondaryPhoneNum: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  email: string;
  @Prop({ type: { type: Types.EmbeddedDocument, ref: 'AddressSchema' } })
  serviceAddr: Address;
  @Prop({ type: { type: Types.EmbeddedDocument, ref: 'AddressSchema' } })
  billingAddr: Address;
  @Prop()
  processor: string[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
