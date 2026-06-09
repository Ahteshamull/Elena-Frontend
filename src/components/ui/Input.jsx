import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150 ease-in-out",
          Icon && "pl-10",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
    
  );
});

Input.displayName = "Input";

export { Input };
