import { RequiredExceptFor } from 'src/types';
import { MongooseSchemaModel } from '../shared/mongoose.model';
import { Address } from '../shared/components/address/address.model';

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
  processor: string[];

  public constructor(init: RequiredExceptFor<Client, 'secondaryPhoneNum' | 'email' | 'serviceAddr' | 'billingAddr' | 'processor'>) {
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
      if (init.processor)
        this.processor = init.processor;
    }
  }

  isEqual(other: Client): boolean {
    return Object.keys(this).every(_ => this[_] === other[_]);
  }
}
