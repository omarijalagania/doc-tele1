'use client';

import type { HTMLAttributes } from 'react';

import { cn } from '@documenso/ui/lib/utils';
import { Card } from '@documenso/ui/primitives/card';

export type WidgetProps = HTMLAttributes<HTMLDivElement>;

export const WidgetNoForm = ({ className, children, ...props }: WidgetProps) => {
  return (
    <>
      <Card
        className={cn('mx-auto w-full  rounded-3xl before:rounded-3xl', className)}
        gradient
        {...props}
      >
        <div className="w-full">
          <div className="text-muted-foreground  col-span-1 flex flex-col gap-y-4 p-6 text-xs leading-relaxed">
            {children}
          </div>
        </div>
      </Card>
    </>
  );
};
