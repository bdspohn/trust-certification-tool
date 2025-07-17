import React from "react";
import { cn } from "@/lib/utils";

export function StepNavigation({ currentStep, totalSteps }) {
  const steps = [
    { name: "Trust Info", description: "Basic trust details" },
    { name: "Trustees", description: "Trustee information" },
    { name: "Powers", description: "Trust powers and restrictions" },
    { name: "Review", description: "Review and generate" },
  ];

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                index <= currentStep
                  ? "border-blue-600"
                  : "border-gray-200"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  index <= currentStep
                    ? "text-blue-600"
                    : "text-gray-500"
                )}
              >
                Step {index + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  index <= currentStep
                    ? "text-blue-600"
                    : "text-gray-500"
                )}
              >
                {step.name}
              </span>
              <span className="text-xs text-gray-500">
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
} 