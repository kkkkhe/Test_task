import { InputHTMLAttributes, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};
export const ManageInput = (props: InputProps) => {
  const [isError, setError] = useState();
  const { error, ...rest } = props;
  return (
    <label className="relative flex w-full flex-col">
      <label
        className={`text-left text-[12px] ${
          error ? "text-red-500" : "text-white"
        }`}
      >
        {error ? error : props.placeholder}
      </label>
      <input
        onSubmit={() => console.log("submit")}
        type="text"
        {...rest}
        className="p-2 w-full outline-none rounded-[5px]"
      />
    </label>
  );
};
