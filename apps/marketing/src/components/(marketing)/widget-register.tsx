'use client';

import type { HTMLAttributes } from 'react';

import { cn } from '@documenso/ui/lib/utils';
import { Card } from '@documenso/ui/primitives/card';

export type WidgetProps = HTMLAttributes<HTMLDivElement>;

export const WidgetRegister = ({ className, children, ...props }: WidgetProps) => {
  return (
    <>
      <Card className={cn('mx-auto w-full  rounded-xl', className)} gradient {...props}>
        <div className="w-full">{children}</div>
      </Card>
    </>
  );
};
