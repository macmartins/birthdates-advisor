export default interface Birthday {
  name: string;
  surname: string;
  birthday: Date;
  country: string;
}

export interface BirthdayAPI extends Omit<Birthday, "birthday"> {
  _id?: string;
  birthday: string; // ISO string
}
