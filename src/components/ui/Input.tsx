/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { OnlyNumbers } from "@/lib/numberValidation";
import Image from "next/image";
import PasswordPolicyTooltip from "@/components/ui/PasswordToolTip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  label?: string;
  placeHolder?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  disableShowIcon?: boolean;
  mode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  error?: string | null;
  success?: string | null;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      required = false,
      placeHolder = "",
      className,
      maxLength,
      minLength,
      disabled,
      disableShowIcon,
      mode,
      error,
      success,
      onClick,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname() ?? ""; // Get the current pathname
    const [showTooltip, setShowTooltip] = useState(false);
    const [inputError, setInputError] = useState<string | null>(null);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      // Check for required field
      if (required && !value) {
        setInputError(`${label} is required`);
      } else {
        setInputError(null);
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className={`w-full flex flex-col gap-1`}>
        <label
          htmlFor={id}
          className={`block text-sm font-bold mb-1 text-gray-700 items-centre px-1`}
        >
          <span className="flex items-center">
            {label}
            {required && <span className="text-red-500 pl-1">*</span>}
            {(label === "New Password" || label === "Password") &&
              !disableShowIcon && (
                <button
                  className="pl-1 relative cursor-pointer bg-transparent border-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={
                    onClick as React.MouseEventHandler<HTMLButtonElement>
                  }
                  tabIndex={0}
                  aria-label="Show password requirements"
                >
                  <span className="cursor-pointer" onClick={onClick}>
                    <Image
                      src="/iDetail.svg"
                      alt="iDetail"
                      width={16}
                      height={16}
                    />
                  </span>
                  {showTooltip && (
                    <PasswordPolicyTooltip
                      pathname={pathname}
                      setShowTooltip={setShowTooltip}
                    />
                  )}
                </button>
              )}
          </span>
        </label>
        <input
          id={id}
          type={type}
          autoComplete="off"
          className={classNames(
            className,
            `w-full border border-gray-300 p-3 rounded-md outline-none focus:outline-none`
          )}
          placeholder={placeHolder}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          ref={ref}
          disabled={disabled}
          onChange={onChange}
          onBlur={handleBlur} // Custom validation logic
          onKeyDown={(e) => {
            if (mode === "numeric") {
              OnlyNumbers(e, id);
            }
          }}
          {...props} // Spread the rest of the props onto the input element
        />
        {(error || inputError) && (
          <p className="h-[2rem] lg:h-[0.9rem] text-red-500 text-xs mt-1">
            {error ?? inputError}
          </p>
        )}

        {success && (
          <p className="h-[0.9rem] text-green-500 text-xs mt-1">{success}</p>
        )}
      </div>
    );
  }
);

export default Input;
