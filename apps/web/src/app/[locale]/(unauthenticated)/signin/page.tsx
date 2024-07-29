'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { env } from 'next-runtime-env';

import { IS_GOOGLE_SSO_ENABLED, IS_OIDC_SSO_ENABLED } from '@documenso/lib/constants/auth';
import { decryptSecondaryData } from '@documenso/lib/server-only/crypto/decrypt';

import { SignInForm } from '~/components/forms/signin';
import { useScopedI18n } from '~/locales/client';

type SignInPageProps = {
  searchParams: {
    email?: string;
  };
};

export default function SignInPage({ searchParams }: SignInPageProps) {
  const NEXT_PUBLIC_DISABLE_SIGNUP = env('NEXT_PUBLIC_DISABLE_SIGNUP');

  const rawEmail = typeof searchParams.email === 'string' ? searchParams.email : undefined;
  const email = rawEmail ? decryptSecondaryData(rawEmail) : null;
  const scopedT = useScopedI18n('auth');

  if (!email && rawEmail) {
    redirect('/signin');
  }

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-6">
        <h1 className="text-2xl font-semibold">{scopedT('signIn')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">{scopedT('signInDesc')}</p>
        <hr className="-mx-6 my-4" />

        <SignInForm
          initialEmail={email || undefined}
          isGoogleSSOEnabled={IS_GOOGLE_SSO_ENABLED}
          isOIDCSSOEnabled={IS_OIDC_SSO_ENABLED}
        />

        {NEXT_PUBLIC_DISABLE_SIGNUP !== 'true' && (
          <p className="text-muted-foreground mt-6 text-center text-sm">
            {scopedT('dontHaveAccount')}{' '}
            <Link href="/signup" className="text-documenso-700 duration-200 hover:opacity-70">
              {scopedT('registerNow')}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
