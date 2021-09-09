import { MongooseSchemaModel } from '../../mongoose.model';
import { RequiredExceptFor } from 'src/types';

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

  isEqual(other: Address): boolean {
    return Object.keys(this).every(_ => this[_] === other[_]);
  }

  toString(): string {
    let address = this.streetAddr + ', ' + this.city + ', ' + this.state;
    if (this.zip)
      address += ' ' + this.zip;
    return address;
  }
}