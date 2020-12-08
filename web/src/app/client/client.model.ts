export class Client {
  id?: number;
  createdOn?: Date;
  phoneNum: string;
  firstName: string;
  lastName: string;
  streetAddr: string;
  city: string;
  state: string;
  zip: string;
  squareCust: boolean;

  public constructor(init: Partial<Client>) {
    if (init) {
      Object.assign(this, init);
      
      if (!init.squareCust)
        this.squareCust = false;
    }
  }

  isEqual = (other: Client) => Object.keys(this).every(_ => this[_] === other[_]);
}
