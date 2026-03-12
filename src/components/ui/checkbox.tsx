import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300",
            "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "checked:bg-blue-600 checked:border-blue-600",
            "appearance-none",
            className
          )}
          {...props}
        />
        {checked && (
          <Check className="absolute left-0 top-0 h-4 w-4 text-white pointer-events-none stroke-[3]" />
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
