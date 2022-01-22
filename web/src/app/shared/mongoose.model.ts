export class MongooseSchemaModel {
  _id: string;
  id: number;
  createdOn: Date;
  
  constructor(init: Required<MongooseSchemaModel>) {
    Object.assign(this, init);
  }
}
