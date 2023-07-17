"use client";

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormButton = ({ children, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      type="submit"
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner text-accent" />}
      {children}
    </button>
  );
};

export default FormButton;
