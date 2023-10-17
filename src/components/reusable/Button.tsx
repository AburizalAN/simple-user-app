"use client";
import clsx from "clsx";
import Spinner from "./Spinner";

interface ButtonProps {
  children: React.ReactNode;
  color?: "default" | "primary" | "secondary" | "info" | "warning" | "danger";
  block?: boolean;
  variant?: "outlined" | "filled";
  size?: "sm" | "base" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
}

const Button = ({
  children,
  variant,
  color = "default",
  block,
  size = "base",
  className,
  onClick,
  loading = false,
  ...rest
}: ButtonProps) => {
  const mergedClass = clsx(
    variant === "outlined" ? `btn-outlined` : "btn",
    color && `btn-${color}`,
    block && "w-full",
    size && `text-${size}`,
    className
  );

  return (
    <button onClick={onClick} className={mergedClass} {...rest}>
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
};

export default Button;