import React from 'react'
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}& React.ButtonHTMLAttributes<HTMLButtonElement>
const Button = ({ children, variant = "primary",className,...rest}: ButtonProps) => {
    const $base = "h-10 px-4 py-2 text-center px-4 py-2 text-center font-semibold text-(--font-body-md) cursor-pointer";
    const variants = {
        primary: " bg-(--color-primary) text-white",
        secondary: "text-(--color-primary)",
        ghost: "text-slate-600"
    }
  return (
    <button {...rest} className={` ${variants[variant]} ${$base}  ${className || ''}`}>
      {children}
    </button>
  )
}

export default Button