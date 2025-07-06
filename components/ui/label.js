// components/ui/label.js

import React from "react";
import { cn } from "@/lib/utils"; // optional, only if you have className utilities

export function Label({ className, ...props }) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700", className)}
      {...props}
    />
  );
}
