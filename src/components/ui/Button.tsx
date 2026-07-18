"use client"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "danger" 
  | "primary-rounded" 
  | "secondary-rounded" 
  | "danger-rounded" 
  | "primary-outline" 
  | "secondary-outline"
  | "danger-outline"
  | "primary-outline-rounded"
  | "secondary-outline-rounded"
  | "danger-outline-rounded"

type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  animateOnHover?: "lift" | "scale" | "glow" | "pulse" | "none"
  animateOnClick?: "ripple" | "scale" | "none"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    icon, 
    iconPosition = "left",
    fullWidth = false,
    animateOnHover = "lift",
    animateOnClick = "ripple",
    children, 
    ...props 
  }, ref) => {
    // Base styles with entry animation
    const base = [
      "relative",
      "font-medium",
      "rounded",
      "cursor-pointer",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
      "disabled:pointer-events-none",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "focus:ring-[var(--primary-base)]",
      "overflow-hidden",
      // Entry animation - fade in and slide up
      "animate-in",
      "fade-in-0",
      "slide-in-from-bottom-4",
      "duration-500",
      "ease-out",
      fullWidth ? "w-full" : "w-auto",
      // Disable animations if user prefers reduced motion
      "motion-safe:transition-all",
      "motion-safe:duration-300",
      "motion-safe:ease-in-out",
    ].join(" ")

    // Hover animations
    const hoverAnimations = {
      lift: `
        hover:-translate-y-1 
        hover:shadow-xl 
        hover:scale-[1.02]
        hover:shadow-[var(--primary-base)]/25
        motion-reduce:hover:translate-y-0
        motion-reduce:hover:scale-100
      `,
      scale: `
        hover:scale-105 
        hover:shadow-lg
        hover:shadow-[var(--primary-base)]/20
        motion-reduce:hover:scale-100
      `,
      glow: `
        hover:shadow-2xl 
        hover:shadow-[var(--primary-base)]/40
        hover:ring-2
        hover:ring-[var(--primary-base)]/50
        motion-reduce:hover:shadow-none
      `,
      pulse: `
        hover:animate-pulse
        hover:shadow-lg
        hover:shadow-[var(--primary-base)]/20
      `,
      none: ""
    }

    // Click animations (applied via event handlers)
    const clickAnimations = {
      ripple: "active:after:scale-100 active:after:opacity-100",
      scale: "active:scale-95",
      none: ""
    }

    const variants: Record<ButtonVariant, string> = {
      primary: `
        bg-[var(--primary-base)] 
        text-[var(--secondary-base)] 
        hover:bg-[var(--primary-tint-200)] 
        focus:ring-[var(--primary-base)]
      `,
      secondary: `
        bg-[var(--secondary-base)] 
        text-white 
        hover:bg-[var(--secondary-shade-200)] 
        focus:ring-[var(--secondary-base)]
      `,
      danger: `
        bg-[var(--danger-base)] 
        text-white 
        hover:bg-[var(--danger-shade-200)] 
        focus:ring-[var(--danger-base)]
      `,
      "primary-rounded": `
        bg-[var(--primary-base)] 
        text-[var(--secondary-base)] 
        hover:bg-[var(--primary-tint-200)] 
        rounded-full 
        focus:ring-[var(--primary-base)]
      `,
      "secondary-rounded": `
        bg-[var(--secondary-base)] 
        text-white 
        hover:bg-[var(--secondary-shade-200)] 
        rounded-full 
        focus:ring-[var(--secondary-base)]
      `,
      "danger-rounded": `
        bg-[var(--danger-base)] 
        text-white 
        hover:bg-[var(--danger-shade-200)] 
        rounded-full 
        focus:ring-[var(--danger-base)]
      `,
      "primary-outline": `
        border-2 
        border-[var(--primary-shade-200)] 
        text-[var(--primary-shade-400)] 
        bg-transparent 
        hover:bg-[var(--primary-base)] 
        hover:text-[var(--secondary-base)] 
        hover:border-[var(--primary-base)] 
        focus:ring-[var(--primary-base)]
      `,
       "secondary-outline": `
       border-2 
        border-[var(--secondary-shade-200)] 
        text-[var(--secondary-shade-400)] 
        bg-transparent 
        hover:bg-[var(--secondary-base)] 
        hover:text-[var(--secondary-base)] 
        hover:border-[var(--secondary-base)] 
        focus:ring-[var(--secondary-base)]       
      `,
       "danger-outline": `
       border-2 
        border-[var(--danger-shade-200)] 
        text-[var(--danger-shade-400)] 
        bg-transparent 
        hover:bg-[var(--danger-base)] 
        hover:text-[var(--danger-base)] 
        hover:border-[var(--danger-base)] 
        focus:ring-[var(--danger-base)]       
      `,
      "primary-outline-rounded": `
        border-2 
        border-[var(--primary-shade-200)] 
        text-[var(--primary-shade-400)] 
        bg-transparent 
        hover:bg-[var(--primary-base)] 
        hover:text-[var(--secondary-base)] 
        hover:border-[var(--primary-base)] 
        rounded-full 
        focus:ring-[var(--primary-base)]
      `,
      "secondary-outline-rounded": `
        border-2 
        border-[var(--secondary-shade-200)] 
        text-[var(--secondary-shade-400)] 
        bg-transparent 
        hover:bg-[var(--secondary-base)] 
        hover:text-[var(--secondary-base)] 
        hover:border-[var(--secondary-base)] 
        rounded-full 
        focus:ring-[var(--secondary-base)]
      `,
      "danger-outline-rounded": `
        border-2 
        border-[var(--danger-shade-200)] 
        text-[var(--danger-shade-400)] 
        bg-transparent 
        hover:bg-[var(--primary-base)] 
        hover:text-[var(--secondary-base)] 
        hover:border-[var(--primary-base)] 
        rounded-full 
        focus:ring-[var(--danger-base)]
      `,
    }

    const sizes: Record<ButtonSize, string> = {
      sm: "px-3.5 py-1.5 text-sm gap-2 min-h-[32px]",
      md: "px-5 py-2.5 text-sm gap-2.5 min-h-[40px]",
      lg: "px-7 py-3.5 text-base gap-3 min-h-[48px]",
    }

    const iconSize = {
      sm: "w-4 h-4",
      md: "w-4.5 h-4.5",
      lg: "w-5 h-5",
    }

    // Ripple effect handler
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animateOnClick === "ripple") {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const ripple = document.createElement("span")
        const size = Math.max(rect.width, rect.height)
        
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`
        ripple.className = `
          absolute 
          rounded-full 
          bg-white/30 
          pointer-events-none 
          animate-ripple 
          motion-safe:animate-ripple
          duration-700
          ease-out
        `
        
        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 700)
      }

      // Trigger scale animation
      if (animateOnClick === "scale") {
        const button = e.currentTarget
        button.style.transform = "scale(0.95)"
        setTimeout(() => {
          button.style.transform = ""
        }, 150)
      }

      props.onClick?.(e as any)
    }

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          hoverAnimations[animateOnHover],
          clickAnimations[animateOnClick],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center justify-center">
          {icon && iconPosition === "left" && (
            <span className={cn(
              "inline-flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
              iconSize[size]
            )}>
              {icon}
            </span>
          )}
          <span className="transition-all duration-300">
            {children}
          </span>
          {icon && iconPosition === "right" && (
            <span className={cn(
              "inline-flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
              iconSize[size]
            )}>
              {icon}
            </span>
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = "Button"
export default Button