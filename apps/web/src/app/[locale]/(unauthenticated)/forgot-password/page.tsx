'use client';

import Link from 'next/link';

import { ForgotPasswordForm } from '~/components/forms/forgot-password';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';

export default function ForgotPasswordPage() {
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">{scopedT('noPassword')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">{scopedT('noPasswordDesc')}</p>

        <ForgotPasswordForm className="mt-4" />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          {scopedT('rememberedPassword')}{' '}
          <Link
            href={`/${currentLocale}/signin`}
            className="text-primary duration-200 hover:opacity-70"
          >
            {scopedT('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}