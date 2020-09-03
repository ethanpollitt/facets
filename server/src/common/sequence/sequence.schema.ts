import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sequence extends Document {
  @Prop({ required: true, unique: true, immutable: true })
  name: string;
  @Prop({ default: 1 })
  seq: number;
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence);

