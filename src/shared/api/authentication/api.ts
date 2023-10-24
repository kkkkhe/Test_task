import { SuccessMessage, ErrorMessage } from "./dto";
export const signInQuery = async (username: string, password: string) => {
  const response = await fetch("https://technical-task-api.icapgroupgmbh.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.ok) {
    const data = (await response.json()) as SuccessMessage;
    return {
      message: data.message,
      status: 201,
      user: {
        username,
        password,
      },
    };
  }
  const data = (await response.json()) as ErrorMessage;
  throw new Error(data.error)
};
