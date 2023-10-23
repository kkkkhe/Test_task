export type UserId = number;

export type UserDto = {
  id: UserId;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: number;
  address: string;
};

export type GetUsersDto = {
  count: number;
  next: string;
  previous: string;
  results: UserDto[];
};
