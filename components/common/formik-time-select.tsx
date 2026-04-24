"use client";

import { getIn } from "formik";
import ReactSelect from "react-select";
import { FieldError } from "../layout/inquiry-form/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormikTimeSelectProps {
  name: string;
  formik: {
    values: Record<string, unknown>;
    touched: Record<string, unknown>;
    errors: Record<string, unknown>;
    setFieldValue: (field: string, value: unknown) => void;
    setFieldTouched: (field: string, touched: boolean) => void;
  };
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorVariant?: "bold" | "inline";
  minuteInterval?: 15 | 30 | 60;
}

// Generate time options in 24-hour format
function generateTimeOptions(interval: 15 | 30 | 60 = 15): SelectOption[] {
  const options: SelectOption[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      const time24 = `${hourStr}:${minuteStr}`;

      // Format display as 12-hour with AM/PM for readability
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      const label = `${hour12}:${minuteStr} ${ampm}`;

      options.push({ value: time24, label });
    }
  }

  return options;
}

export function FormikTimeSelect({
  name,
  formik,
  label,
  placeholder = "Select time",
  isDisabled = false,
  required = false,
  errorVariant = "inline",
  minuteInterval = 15,
}: FormikTimeSelectProps) {
  const error = getIn(formik.touched, name)
    ? getIn(formik.errors, name)
    : undefined;
  const value = getIn(formik.values, name) as string;

  const timeOptions = generateTimeOptions(minuteInterval);

  const handleChange = (option: unknown) => {
    const newValue = (option as SelectOption)?.value || "";
    formik.setFieldValue(name, newValue);
  };

  const selectedValue = timeOptions.find((opt) => opt.value === value);

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-accent-soft">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <ReactSelect
        options={timeOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={true}
        className="react-select-container w-full"
        classNamePrefix="react-select"
        onBlur={() => formik.setFieldTouched(name, true)}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "1rem",
            border: error ? "1px solid #7f2f2f" : "1px solid #d5ccbf",
            backgroundColor: "#ffffff",
            padding: "0 4px",
            minHeight: "auto",
            height: "auto",
            fontSize: "1rem",
            fontWeight: "400",
            color: "#1e1a17",
            boxShadow: "none",
            outline: "none",
            cursor: "pointer",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0.95rem 0.25rem",
            gap: "0.25rem",
          }),
          input: (base) => ({
            ...base,
            padding: "0",
            margin: "0",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#61564b",
            padding: "4px",
            transition: "color 200ms",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#61564b",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            marginTop: "4px",
            zIndex: 50,
          }),
          menuList: (base) => ({
            ...base,
            padding: "4px",
            maxHeight: "200px",
            "::-webkit-scrollbar": {
              width: "8px",
            },
            "::-webkit-scrollbar-track": {
              background: "rgba(213, 204, 191, 0.2)",
              borderRadius: "4px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "rgba(97, 86, 75, 0.5)",
              borderRadius: "4px",
            },
          }),
          option: (base, state) => ({
            ...base,
            borderRadius: "0.375rem",
            padding: "8px 12px",
            margin: "0",
            backgroundColor: state.isSelected
              ? "#75695d"
              : state.isFocused
                ? "rgba(213, 204, 191, 0.5)"
                : "transparent",
            color: state.isSelected ? "#ffffff" : "#1e1a17",
            cursor: "pointer",
            fontSize: "0.875rem",
            transition: "background-color 150ms",
            "&:hover": {
              backgroundColor: state.isSelected
                ? "#75695d"
                : "rgba(213, 204, 191, 0.5)",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1e1a17",
          }),
        }}
      />
      <FieldError error={error as string | undefined} variant={errorVariant} />
    </div>
  );
}
