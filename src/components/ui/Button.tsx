

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" // btn  UI
  size?: "sm" | "md" | "lg" //Button Size
  icon?: React.ReactNode //Icon
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md",icon, children, ...props }, ref) => {
    const base = "font-medium rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary: "bg-[var(--primary-base)] text-[var(--secondary-base)] hover:bg-[var(--primary-tint-200)]",
      secondary: "bg-[var(--secondary-base)] text-white hover:bg-[var(--secondary-shade-200)]",
      danger: "bg-[var(--danger-base)] text-white hover:bg-[var(--danger-shade-200)]",
      ghost: "bg-transparent text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-800",
    }

    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
export default Button
