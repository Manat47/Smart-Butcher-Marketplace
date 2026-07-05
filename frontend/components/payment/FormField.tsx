import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  error,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={name} className="text-xs font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full border rounded-xl px-4 py-5 text-sm transition-colors ${
          error
            ? "border-red-500 bg-red-50/30 focus-visible:ring-red-500"
            : "border-gray-200 bg-[#fafaf8] focus-visible:ring-[#4E0707]"
        }`}
      />
      {error && (
        <span className="text-xs text-red-500 mt-0.5 pl-1">{error}</span>
      )}
    </div>
  );
}
