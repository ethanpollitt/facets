import { ApiProperty } from '@nestjs/swagger';

export class TechnicianDto {
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly secondaryPhoneNum: string;
  @ApiProperty()
  readonly primaryPhoneNum: string;
  @ApiProperty()
  readonly email: string;
}
