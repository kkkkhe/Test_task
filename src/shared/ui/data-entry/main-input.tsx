import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error: string | null;
};
export const Input = (props: InputProps) => {
  const { label, error, ...rest } = props;
  return (
    <label className="relative flex w-full flex-col">
      <label
        className={`text-left text-[12px] ${
          error ? "text-red-500" : "text-grey"
        }`}
      >
        {error ? error : label}
      </label>
      <input
        {...rest}
        type="text"
        className="border-3 bg-grey text-white outline-none px-2 py-1 rounded-[5px]"
      />
    </label>
  );
};
