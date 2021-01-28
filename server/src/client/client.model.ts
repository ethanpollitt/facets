import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from 'src/address/address.model';

export class ClientDto {
  @ApiProperty()
  readonly type: ClientType;
  @ApiProperty()
  readonly primaryPhoneNum: string;
  @ApiProperty()
  readonly secondaryPhoneNum: string;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly serviceAddr: AddressDto;
  @ApiProperty()
  readonly billingAddr: AddressDto;
  @ApiProperty()
  readonly squareCust: boolean;
}

export enum ClientType {
  RES = 'RES',
  COM = 'COM'
}
