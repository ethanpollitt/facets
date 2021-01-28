import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  readonly streetAddr: string;
  @ApiProperty()
  readonly city: string;
  @ApiProperty()
  readonly state: string;
  @ApiProperty()
  readonly zip: string;
}
