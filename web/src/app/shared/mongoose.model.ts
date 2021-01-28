export class MongooseSchemaModel {
  id: number;
  createdOn: Date;
  
  constructor(init: Required<MongooseSchemaModel>) {
    Object.assign(this, init);
  }
}
