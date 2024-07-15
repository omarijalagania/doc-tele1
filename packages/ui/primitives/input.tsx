import * as React from 'react';

import { cn } from '../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <label className="relative">
        <input
          type={type}
          className={cn(
            'bg-background border-input ring-offset-background placeholder:text-muted-foreground/40 focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            prefix && 'pl-20',
            {
              'ring-2 !ring-red-500 transition-all': props['aria-invalid'],
            },
          )}
          ref={ref}
          {...props}
        />
        {prefix && (
          <div className="text-muted-foreground absolute inset-y-0 left-0 flex items-center pl-3 text-sm">
            {prefix}
          </div>
        )}
      </label>
    );
  },
);

Input.displayName = 'Input';

export { Input };
