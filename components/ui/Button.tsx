import React from "react";
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const base =
    "h-10 px-4 font-semibold text-(--font-body-md) transition cursor-pointer";

  const variants = {
    primary: "bg-(--color-primary) text-white",
    secondary: "text-(--color-primary)",
    ghost: "text-slate-600",
  };

  return (
    <button
      {...rest}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${base}
        ${className || ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;