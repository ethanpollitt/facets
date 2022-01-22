import { RequiredExceptFor } from "src/types";
import { MongooseSchemaModel } from "../shared/mongoose.model";

export class Technician extends MongooseSchemaModel {
  firstName: string;
  lastName: string;
  secondaryPhoneNum: string;
  primaryPhoneNum: string;
  email: string;
  
  public constructor(init: RequiredExceptFor<Technician, 'secondaryPhoneNum'>) {
    super(init);
    if (init) {
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
      this.primaryPhoneNum = init.primaryPhoneNum;

      if (init.secondaryPhoneNum)
        this.secondaryPhoneNum = init.secondaryPhoneNum;
    }
  }
}
