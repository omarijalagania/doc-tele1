'use client';

import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

import { useCurrentLocale, useScopedI18n } from '~/locales/client';

export default function ResetPasswordPage() {
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">{scopedT('unableReset')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          The token you have used to reset your password is either expired or it never existed. If
          you have still forgotten your password, please request a new reset link.
        </p>

        <Button className="mt-4" asChild>
          <Link href={`/${currentLocale}/signin`}>{scopedT('signIn')}</Link>
        </Button>
      </div>
    </div>
  );
}
