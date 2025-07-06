// components/ui/button.js
import React from "react";
import { cn } from "@/lib/utils"; // make sure this is defined

export const Button = React.forwardRef(
  ({ className, type = "button", ...props }, ref) => (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-white shadow-md transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";
