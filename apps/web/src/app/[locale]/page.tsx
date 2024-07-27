import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { env } from 'next-runtime-env';

import { decryptSecondaryData } from '@documenso/lib/server-only/crypto/decrypt';

import { SignUpFormV2 } from '~/components/forms/v2/signup';
import { FooterWeb } from '~/components/partials/footer-web';

export const metadata: Metadata = {
  title: 'Sign Up',
};

type SignUpPageProps = {
  searchParams: {
    email?: string;
  };
};

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  const NEXT_PUBLIC_DISABLE_SIGNUP = env('NEXT_PUBLIC_DISABLE_SIGNUP');

  if (NEXT_PUBLIC_DISABLE_SIGNUP === 'true') {
    redirect('/signin');
  }

  const rawEmail = typeof searchParams.email === 'string' ? searchParams.email : undefined;
  const email = rawEmail ? decryptSecondaryData(rawEmail) : null;

  if (!email && rawEmail) {
    redirect('/signup');
  }

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <SignUpFormV2 className="w-screen max-w-screen-2xl px-4 pt-10 md:px-16" />

      <FooterWeb />
    </div>
  );
}
