import { getIn } from "formik";

export function classNames(
  ...values: Array<string | false | null | undefined>
) {
  return values.filter(Boolean).join(" ");
}

export function FieldError({
  error,
  variant = "inline",
}: {
  error?: string;
  variant?: "bold" | "inline";
}) {
  if (!error) {
    return null;
  }

  if (variant === "inline") {
    return <p className="text-sm text-danger mt-1">{error}</p>;
  }

  return (
    <p className="text-sm text-white bg-danger p-2 mt-2 rounded-md">{error}</p>
  );
}

export const stepLabels = [
  {
    key: "info",
    title: "Pricing & Services",
    description:
      "Brief information about our service styles, pricing, and policies.",
  },
  {
    key: "details",
    title: "Event details",
    description: "Date, guest count, service type, and event context.",
  },
  {
    key: "menu",
    title: "Menu build",
    description: "Choose included dishes and see where add-ons begin.",
  },
  {
    key: "contact",
    title: "Contact and send",
    description: "Review the estimate, add contact details, and submit.",
  },
] as const;

export function getStepErrorCount(errors: unknown, fields: readonly string[]) {
  return fields.reduce((count, field) => {
    return getIn(errors, field) ? count + 1 : count;
  }, 0);
}

export const inputClass =
  "w-full rounded-[1rem] border border-line bg-white px-4 py-[0.95rem] text-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-soft focus:shadow-[0_0_0_4px_rgba(117,105,93,0.12)]";
