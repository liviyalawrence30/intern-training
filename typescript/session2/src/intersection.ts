type Identifiable = {
  readonly id: string;
};
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};
type SoftDeletable = {
  deletedAt?: Date;
  isDeleted: boolean;
};

type BaseRecord = Identifiable & Timestamped;
type UserRecord = BaseRecord & {
  name: string;
  email: string;
};
type AuditedUserRecord = UserRecord & SoftDeletable;

function isDeleted(record: SoftDeletable): boolean {
  return record.isDeleted;
};

const baseRecord: BaseRecord = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date()
};
const userRecord: UserRecord = {
  id: "2",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Maria",
  email: "maria@example.com"
};
const auditedUser: AuditedUserRecord = {
  id: "3",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Liviya",
  email: "liviya@example.com",
  isDeleted: true,
  deletedAt: new Date()
};
console.log(isDeleted(auditedUser));


//when we intersect two properties with same name and different types, the type becomes 'never'.

type A = { value: string };
type B = { value: number };
type C = A & B;
/*
const user:C={
    value:"Hello"//error:Type 'string' is not assignable to type 'never'.
};
*/
//Because a value can never be both a string and a number at the same time.
// string & number resolves to never.The type of C['value'] is never.
// we will not be able to assign any value to that property.
//So,it cannot be satisfied.



