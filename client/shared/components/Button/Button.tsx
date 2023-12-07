import { FC, PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({className, children, ...rest}) => {
  return (
    <button className={`px-2 py-3 bg-red-500 rounded-md text-white ${className}`} {...rest}>
      {children}
    </button>
  );
};
