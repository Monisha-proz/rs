import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[var(--primary-shade-200)] focus:ring-2 focus:ring-[var(--primary-tint-800)]", className)} {...props} />;
}
