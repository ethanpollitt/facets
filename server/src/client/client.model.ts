import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  readonly phoneNum: string;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly streetAddr: string;
  @ApiProperty()
  readonly city: string;
  @ApiProperty()
  readonly state: string;
  @ApiProperty()
  readonly zip: string;
  @ApiProperty()
  readonly squareCust: boolean;
}