import { useAction } from "@/src/shared/lib/redux";
import { useEffect, useState } from "react";
import { signInThunk } from "./signin.model";
import { useSelector } from "react-redux";
import { sessionModel } from "@/src/entities/session";
import { Input } from "@/src/shared/ui/data-entry/main-input";
import { useRouter } from "next/router";
import { validate } from "./lib";

export const Signin = () => {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const error = useSelector(sessionModel.selectors.error);
  const user = useSelector(sessionModel.selectors.user);
  const signIn = useAction(signInThunk);

  const router = useRouter();

  useEffect(() => {
    if (user.username) {
      router.push("/users");
    }
  }, [user]);
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="flex flex-col w-[500px] gap-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const usernameError = validate({
            str: username,
            max: 150,
            min: 1,
            label: "Username",
          });
          const passwordError = validate({
            str: password,
            max: 120,
            min: 1,
            label: "Password",
          });
          if (!passwordError && !usernameError) {
            signIn({ username, password });
          }
          setPasswordError(passwordError);
          setUsernameError(usernameError);
        }}
      >
        <Input
          label="Username"
          value={username}
          error={usernameError}
          onChange={(e) => changeUsername(e.target.value)}
        />
        <Input
          label="Password"
          value={password}
          error={passwordError}
          onChange={(e) => changePassword(e.target.value)}
        />
        <Error error={error} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-150">Submit</button>
      </form>
    </div>
  );
};


const Error = ({ error }: { error: string | null }) => {
  return (
    <div className="h-10">
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};