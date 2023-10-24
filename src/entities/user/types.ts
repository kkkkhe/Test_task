import { UserId } from "@/src/shared/api/user";

export type User = {
  id: UserId;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
