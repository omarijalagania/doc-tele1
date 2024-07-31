'use client';

import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

import { useCurrentLocale, useScopedI18n } from '~/locales/client';

export default function ForgotPasswordPage() {
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-4xl font-semibold">{scopedT('emailSent')}</h1>

        <p className="text-muted-foreground mb-4 mt-2 text-sm">{scopedT('resetEmailDesc')}</p>

        <Button asChild>
          <Link href={`/${currentLocale}/signin`}>{scopedT('signIn')}</Link>
        </Button>
      </div>
    </div>
  );
}
