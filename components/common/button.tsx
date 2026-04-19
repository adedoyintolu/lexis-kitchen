import { HTMLProps, ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};
const Button = ({
  variant = "secondary",
  children,
  className,
  type = "button",
  ...rest
}: Props & HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      disabled={rest.disabled}
      className={
        className +
        " " +
        (variant === "primary"
          ? "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-accent disabled:focus-visible:bg-accent disabled:shadow-none"
          : "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-transparent disabled:focus-visible:bg-transparent disabled:border-line-strong")
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
