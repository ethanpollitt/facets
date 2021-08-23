import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { Client } from 'src/client/client.schema';
import { Technician } from 'src/technician/technician.schema';

export class AppointmentDto {
  @ApiProperty()
  readonly cancelled?: boolean; // don't need to pass in
  @ApiProperty()
  readonly client: Client | Types.ObjectId;
  @ApiProperty()
  readonly technician: Technician | Types.ObjectId;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly windowLength: number;  // minutes
  @ApiProperty()
  readonly customerNotes: string;
  @ApiProperty()
  readonly techNotes: string;
  @ApiProperty()
  readonly postNotes: string;
  @ApiProperty()
  readonly routed: [boolean, Date|null];
  @ApiProperty()
  readonly started: [boolean, Date|null];
  @ApiProperty()
  readonly completed: [boolean, Date|null];
}
