import React, { ButtonHTMLAttributes } from "react";

export function QuantityButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-lg"
    >
      {children}
    </button>
  );
}
