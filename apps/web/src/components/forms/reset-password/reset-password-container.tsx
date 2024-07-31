'use client';

import Link from 'next/link';

import { ResetPasswordForm } from '~/components/forms/reset-password';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';

function ResetPasswordContainer({ token }: { token: string }) {
  const scopedT = useScopedI18n('auth');
  const currentLocale = useCurrentLocale();

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-4xl font-semibold">{scopedT('resetPassword')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">{scopedT('newPassword')}</p>

        <ResetPasswordForm token={token} className="mt-4" />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link
            href={`/${currentLocale}/signup`}
            className="text-primary duration-200 hover:opacity-70"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordContainer;
