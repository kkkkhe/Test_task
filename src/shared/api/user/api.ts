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
  const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table?offset=${offset}&limit=${limit}`, {
    method: "GET",
  });
  return (await response.json()) as GetUsersDto;
};

export const userQuery = async (id: string) => {
  const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}`, {
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
  const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await response.json()) as UserDto;
};

export const createUserQuery = async (data: EditUserProps) => {
  const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await response.json()) as UserDto;
}
export const deleteUserQuery = async (id: UserId) => {
  const response = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await response.json());
};;