import React, { ButtonHTMLAttributes } from "react";

export function QuantityButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`
    flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-lg transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white
    
    /* Hover states: only apply when NOT disabled */
    enabled:hover:-translate-y-px enabled:hover:shadow-lg enabled:cursor-pointer
    
    /* Disabled states: visual feedback for inactivity */
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
  `}
    >
      {children}
    </button>
  );
}
