import { ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};
const Button = ({ variant = "secondary", children, className }: Props) => {
  return (
    <button
      className={
        className +
        " " +
        (variant === "primary"
          ? "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-accent text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]"
          : "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-line-strong bg-transparent text-text transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]")
      }
    >
      {children}
    </button>
  );
};

export default Button;
