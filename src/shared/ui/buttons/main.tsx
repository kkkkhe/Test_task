import { ButtonHTMLAttributes } from "react";
type ButtonAttributeProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonAttributeProps) => {
  const { className, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow, ${className}`}
    >
      {children}
    </button>
  );
};
