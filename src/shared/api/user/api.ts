import { GetUsersDto, UserDto, UserId } from "./dto";

export const usersQuery = async ({
  page,
  limit = 10,
}: {
  page: number;
  offset?: number;
  limit?: number;
}) => {
  const offset = limit * page;
  const response = await fetch(`http://146.190.118.121/api/table/`, {
    method: "GET",
  });
  return (await response.json()) as GetUsersDto;
};

export const userQuery = async (id: string) => {
  const response = await fetch(`http://146.190.118.121/api/table/${id}`, {
    method: "GET",
  });
  return (await response.json()) as UserDto;
};

export type EditUserProps = {
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};
export const editUserQuery = async (id: UserId, data: EditUserProps) => {
  const response = await fetch(`http://146.190.118.121/api/table/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
  return (await response.json()) as UserDto;
};
