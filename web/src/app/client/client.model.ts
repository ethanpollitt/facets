import { RequiredExceptFor } from 'src/types';
import { MongooseSchemaModel } from '../shared/mongoose.model';

export type ClientType = 'RES' | 'COM';

export class Client extends MongooseSchemaModel {
  type: ClientType;
  primaryPhoneNum: string;
  secondaryPhoneNum: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceAddr: Address;
  billingAddr: Address;
  squareCust: boolean;

  public constructor(init: RequiredExceptFor<Client, 'secondaryPhoneNum' | 'email' | 'serviceAddr' | 'billingAddr' | 'squareCust'>) {
    super(init);
    if (init) {
      this.type = init.type;
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.primaryPhoneNum = init.primaryPhoneNum;

      if (init.secondaryPhoneNum)
        this.secondaryPhoneNum = init.secondaryPhoneNum;
      if (init.email)
        this.email = init.email;
      if (init.serviceAddr)
        this.serviceAddr = new Address(init.serviceAddr);
      if (init.billingAddr)
        this.billingAddr = new Address(init.billingAddr);
      if (!init.squareCust)
        this.squareCust = false;
    }
  }

  isEqual = (other: Client) => Object.keys(this).every(_ => this[_] === other[_]);
}

export class Address extends MongooseSchemaModel {
  streetAddr: string;
  city: string;
  state: string;
  zip: string;

  public constructor(init: RequiredExceptFor<Address, 'zip'>) {
    super(init);
    if (init)
      Object.assign(this, init);
  }

  isEqual = (other: Address): boolean => Object.keys(this).every(_ => this[_] === other[_]);

  toString = (): string => {
    let address = this.streetAddr + ', ' + this.city + ', ' + this.state;
    if (this.zip)
      address += ' ' + this.zip;
    return address;
  }
}
