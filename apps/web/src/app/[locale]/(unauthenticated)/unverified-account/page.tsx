'use client';

import { Mails } from 'lucide-react';

import { SendConfirmationEmailForm } from '~/components/forms/send-confirmation-email';
import { useScopedI18n } from '~/locales/client';

export default function UnverifiedAccount() {
  const scopedT = useScopedI18n('auth');
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="flex items-start">
        <div className="mr-4 mt-1 hidden md:block">
          <Mails className="text-primary h-10 w-10" strokeWidth={2} />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold md:text-4xl">{scopedT('confirmEmailTitle')}</h2>

          <p className="text-muted-foreground mt-4">{scopedT('pleaseConfirm')}</p>

          <p className="text-muted-foreground mt-4">{scopedT('unverifiedAccount')}</p>

          <SendConfirmationEmailForm />
        </div>
      </div>
    </div>
  );
}
