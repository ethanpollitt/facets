import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sequence, SequenceSchema } from './sequence/sequence.schema';
import { SequenceService } from './sequence/sequence.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sequence.name, schema: SequenceSchema }])
  ],
  providers: [SequenceService],
  exports: [SequenceService]
})
export class CommonModule {}
