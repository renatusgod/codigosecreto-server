import { ErrorEntity } from './error.entity';

export class BaseEntity extends ErrorEntity {
  // private id?: string;
  // private createAt: Date;
  // private updateAt: Date;

  // constructor(id?: string) {
  //   super();
    
  //   if (!id) {
  //     this.id = uuidv4();
  //     this.createAt = new Date();
  //   } else {
  //     this.id = id;
  //     this.updateAt = new Date();
  //   }
  // }

  // get Id() {
  //   return this.id;
  // }

  // get CreateAt() {
  //   return this.createAt;
  // }

  // get UpdateAt() {
  //   return this.updateAt;
  // }
}