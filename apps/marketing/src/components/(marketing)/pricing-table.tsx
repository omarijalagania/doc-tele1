'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';
import { usePlausible } from 'next-plausible';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';

import { useCurrentLocale, useScopedI18n } from '~/locales/client';

export type PricingTableProps = HTMLAttributes<HTMLDivElement>;

const SELECTED_PLAN_BAR_LAYOUT_ID = 'selected-plan-bar';

const businessDescriptionCardArr = [
  {
    id: 1,
    description: 'businessUsers',
  },
  {
    id: 2,
    description: 'businessCompanies',
  },
  {
    id: 3,
    description: 'businessUserAdd',
  },
  {
    id: 4,
    description: 'businessRoles',
  },
  {
    id: 5,
    description: 'businessSendDocuments',
  },
  {
    id: 6,
    description: 'businessTemplates',
  },
  {
    id: 7,
    description: 'businessFolders',
  },
  {
    id: 8,
    description: 'businessShareDocs',
  },
  {
    id: 9,
    description: 'businessContacts',
  },
  {
    id: 10,
    description: 'businessPartners',
  },
  {
    id: 11,
    description: 'businessSignOrder',
  },
  {
    id: 12,
    description: 'businessParallel',
  },
  {
    id: 13,
    description: 'businessPerson',
  },
  {
    id: 14,
    description: 'businessDelegation',
  },
  {
    id: 15,
    description: 'businessScheduled',
  },
  {
    id: 16,
    description: 'businessReminders',
  },
  {
    id: 17,
    description: 'businessReports',
  },
  {
    id: 18,
    description: 'businessIdVerification',
  },
  {
    id: 19,
    description: 'businessAuth',
  },
  {
    id: 20,
    description: 'businessTwoFa',
  },
];

const businessCardArr = [
  {
    id: 1,
    title: 'users',
  },
  {
    id: 2,
    title: 'companies',
  },

  {
    id: 3,
    title: 'addUser',
  },
  {
    id: 4,
    title: 'userRoles',
  },
  {
    id: 5,
    title: 'documentSending',
  },
  {
    id: 6,
    title: 'templates',
  },
  {
    id: 7,
    title: 'folders',
  },
  {
    id: 8,
    title: 'share',
  },
  {
    id: 9,
    title: 'contacts',
  },
  {
    id: 10,
    title: 'partners',
  },
  {
    id: 11,
    title: 'signingOrder',
  },
  {
    id: 12,
    title: 'parallelSigning',
  },
  {
    id: 13,
    title: 'personSign',
  },
  {
    id: 14,
    title: 'signDelegation',
  },
  {
    id: 15,
    title: 'sendPlan',
  },
  {
    id: 16,
    title: 'reminders',
  },
  {
    id: 17,
    title: 'reports',
  },
  {
    id: 18,
    title: 'idVerification',
  },
  {
    id: 19,
    title: 'authentication',
  },
  {
    id: 20,
    title: 'twoFa',
  },
];

const personalCardArrDescription = [
  {
    id: 1,
    description: 'personUserDescription',
  },
  {
    id: 2,
    description: 'personalCompaniesDescription',
  },
  {
    id: 3,
    description: 'personalUserAddDescription',
  },
  {
    id: 4,
    description: 'personalRolesDescription',
  },
  {
    id: 5,
    description: 'personalSendDocumentsDescription',
  },
  {
    id: 6,
    description: 'personalTemplatesDescription',
  },
  {
    id: 7,
    description: 'personalFoldersDescription',
  },
  {
    id: 8,
    description: 'personalContactsDescription',
  },
  {
    id: 9,
    description: 'personalPartnersDescription',
  },
  {
    id: 10,
    description: 'personalSignOrderDescription',
  },
  {
    id: 11,
    description: 'personalParallelDescription',
  },
  {
    id: 12,
    description: 'personalPersonDescription',
  },
  {
    id: 13,
    description: 'personalRemindersDescription',
  },
  {
    id: 14,
    description: 'personalReportsDescription',
  },
  {
    id: 15,
    description: 'personalIdVerificationDescription',
  },
  {
    id: 16,
    description: 'personalAuthDescription',
  },
  {
    id: 17,
    description: 'personalTwoFaDescription',
  },
];

const personalCardArr = [
  {
    id: 1,
    title: 'users',
  },
  {
    id: 2,
    title: 'companies',
  },
  {
    id: 3,
    title: 'addUser',
  },
  {
    id: 4,
    title: 'userRoles',
  },
  {
    id: 5,
    title: 'documentSending',
  },
  {
    id: 6,
    title: 'templates',
  },
  {
    id: 7,
    title: 'folders',
  },
  {
    id: 8,
    title: 'contacts',
  },
  {
    id: 9,
    title: 'partners',
  },
  {
    id: 10,
    title: 'signingOrder',
  },
  {
    id: 11,
    title: 'parallelSigning',
  },
  {
    id: 12,
    title: 'personSign',
  },
  {
    id: 13,
    title: 'reminders',
  },
  {
    id: 14,
    title: 'reports',
  },
  {
    id: 15,
    title: 'idVerification',
  },
  {
    id: 16,
    title: 'authentication',
  },
  {
    id: 17,
    title: 'twoFa',
  },
];

const freeCardArr = [
  {
    id: 1,
    title: 'users',
  },
  {
    id: 2,
    title: 'documentSending',
  },
  {
    id: 3,
    title: 'folders',
  },
  {
    id: 4,
    title: 'contacts',
  },
  {
    id: 5,
    title: 'reports',
  },
  {
    id: 6,
    title: 'idVerification',
  },
  {
    id: 7,
    title: 'authentication',
  },
  {
    id: 8,
    title: 'twoFa',
  },
];

const freeCardDescription = [
  {
    id: 1,
    description: 'userDescription',
  },
  {
    id: 2,
    description: 'documentSendingDescription',
  },
  {
    id: 3,
    description: 'foldersDescription',
  },
  {
    id: 4,
    description: 'contactsDescription',
  },
  {
    id: 5,
    description: 'reportsDescription',
  },
  {
    id: 6,
    description: 'idVerificationDescription',
  },
  {
    id: 7,
    description: 'authenticationDescription',
  },
  {
    id: 8,
    description: 'twoFaDescription',
  },
];

export const PricingTable = ({ className, ...props }: PricingTableProps) => {
  const event = usePlausible();
  const scopedT = useScopedI18n('pricing');
  const [showSigningDialog, setShowSigningDialog] = useState(false);
  const [showStartUpDialog, setShowStartUpDialog] = useState(false);
  const [dialogStartId, setDialogStartId] = useState<number | null>(null);

  const [showBusinessDialog, setShowBusinessDialog] = useState(false);
  const [dialogBusinessId, setDialogBusinessId] = useState<number | null>(null);
  const currentLocale = useCurrentLocale();
  const [dialogId, setDialogId] = useState<number | null>(null);

  const { currentCountry } = useFeatureFlags();

  const openPriceDialogHandler = (id: number) => {
    setDialogId(id);
    setShowSigningDialog(true);
  };

  const openStartUpDialogHandler = (id: number) => {
    setDialogStartId(id);
    setShowStartUpDialog(true);
  };

  const openBusinessDialogHandler = (id: number) => {
    setDialogBusinessId(id);
    setShowBusinessDialog(true);
  };

  const [period, setPeriod] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');

  return (
    <div className={cn('', className)} {...props}>
      <div className="bg-background sticky top-32 flex items-center justify-end gap-x-6 shadow-[-1px_-5px_2px_6px_hsl(var(--background))] md:top-[7.5rem] lg:static lg:justify-center">
        <AnimatePresence>
          <motion.button
            key="MONTHLY"
            className={cn(
              'text-muted-foreground relative flex items-center gap-x-2.5 px-1 py-2.5',
              {
                'text-foreground': period === 'MONTHLY',
                'hover:text-foreground/80': period !== 'MONTHLY',
              },
            )}
            onClick={() => setPeriod('MONTHLY')}
          >
            {scopedT('monthly')}
            {period === 'MONTHLY' && (
              <motion.div
                layoutId={SELECTED_PLAN_BAR_LAYOUT_ID}
                className="bg-foreground lg:bg-primary absolute bottom-0 left-0 h-[3px] w-full rounded-full dark:invert"
              />
            )}
          </motion.button>

          <motion.button
            key="YEARLY"
            className={cn(
              'text-muted-foreground relative flex items-center gap-x-2.5 px-1 py-2.5',
              {
                'text-foreground': period === 'YEARLY',
                'hover:text-foreground/80': period !== 'YEARLY',
              },
            )}
            onClick={() => setPeriod('YEARLY')}
          >
            {scopedT('yearly')}
            <div className="bg-muted text-foreground block rounded-full px-2 py-0.5 text-xs">
              {scopedT('save')} 20%
            </div>
            {period === 'YEARLY' && (
              <motion.div
                layoutId={SELECTED_PLAN_BAR_LAYOUT_ID}
                className="bg-foreground lg:bg-primary absolute bottom-0 left-0 h-[3px] w-full rounded-full dark:invert"
              />
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <div
          data-plan="free"
          className="bg-background shadow-foreground/5 flex flex-col items-center justify-center rounded-lg border px-16  py-12 shadow-lg"
        >
          <p className="text-foreground text-4xl font-medium">{scopedT('free')}</p>
          <p className="text-primary mt-2.5 text-xl font-medium dark:invert">{scopedT('basic')}</p>

          <p className="text-foreground mt-4 max-w-[30ch] text-center">1 {scopedT('singleUser')}</p>

          <Button className="rounded-full text-base" asChild>
            <Link
              href={`${NEXT_PUBLIC_WEBAPP_URL()}/signup?utm_source=pricing-free-plan`}
              target="_blank"
              className="mt-6"
            >
              {scopedT('signup')}
            </Link>
          </Button>

          <div className="mt-8 flex w-full flex-col divide-y">
            {freeCardArr.map((card) => (
              <div
                onClick={() => openPriceDialogHandler(card.id)}
                key={card.id}
                className="text-foreground flex  w-full cursor-pointer items-center justify-between py-4"
              >
                {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                <p>{scopedT(card.title as keyof typeof scopedT)}</p>
                <InfoIcon className="text-primary dark:invert" size={18} />
              </div>
            ))}
          </div>

          <div className="flex-1" />
        </div>

        <Dialog open={showSigningDialog} onOpenChange={setShowSigningDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {scopedT(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  freeCardArr.find((card) => card.id === dialogId)?.title as keyof typeof scopedT,
                )}
              </DialogTitle>
              <DialogDescription>
                {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                {scopedT(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  freeCardDescription.find((card) => card.id === dialogId)
                    ?.description as keyof typeof scopedT,
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={showStartUpDialog} onOpenChange={setShowStartUpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                {scopedT(personalCardArr.find((card) => card.id === dialogStartId)?.title)}
              </DialogTitle>
              <DialogDescription>
                {scopedT(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  (personalCardArrDescription.find((card) => card.id === dialogStartId)
                    ?.description as keyof typeof scopedT) ?? '',
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={showBusinessDialog} onOpenChange={setShowBusinessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                {scopedT(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  (businessCardArr.find((card) => card.id === dialogBusinessId)
                    ?.title as keyof typeof scopedT) ?? 'businessTwoFa',
                )}
              </DialogTitle>
              <DialogDescription>
                {scopedT(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  (businessDescriptionCardArr.find((card) => card.id === dialogBusinessId)
                    ?.description as keyof typeof scopedT) ?? '',
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div
          data-plan="early-adopter"
          className="border-primary bg-background shadow-foreground/5 flex  flex-col items-center justify-center rounded-lg border-2 px-16  py-12 shadow-[0px_0px_0px_4px_#E3E3E380] dark:border-[#FFEB81]"
        >
          <p className="text-foreground text-4xl font-medium">{scopedT('startUp')}</p>
          <div className="text-primary mt-2.5 text-xl font-medium">
            {period === 'MONTHLY' && (
              <div className="dark:invert">{currentCountry === 'ka' ? '45₾' : '$15'}</div>
            )}
            {period === 'YEARLY' && (
              <div className="dark:invert">{currentCountry === 'ka' ? '36₾' : '$12'}</div>
            )}
          </div>

          <p className="text-foreground mt-4 max-w-[30ch] text-center">1 {scopedT('singleUser')}</p>

          {/* <p className="text-foreground mt-4 max-w-[30ch] text-center">
            For fast-growing companies that aim to scale across multiple teams.
          </p> */}

          <Button className="mt-6 rounded-full text-base" asChild>
            <Link
              href={`${NEXT_PUBLIC_WEBAPP_URL()}/signup?utm_source=pricing-early-adopter`}
              target="_blank"
            >
              {scopedT('signup')}
            </Link>
          </Button>

          <div className="mt-8 flex w-full flex-col divide-y">
            {/* <p className="text-foreground py-4">
              <a
                href="https://documen.so/early-adopters-pricing-page"
                target="_blank"
                rel="noreferrer"
              >
                Limited Time Offer: <span className="text-documenso-700">Read More</span>
              </a>
            </p> */}
            {personalCardArr.map((card) => (
              <div
                onClick={() => openStartUpDialogHandler(card.id)}
                key={card.id}
                className="text-foreground flex cursor-pointer items-center justify-between py-4"
              >
                {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                <p>{scopedT(card.title as keyof typeof scopedT)}</p>
                <InfoIcon className="text-primary dark:invert" size={18} />
              </div>
            ))}
          </div>
          <div className="flex-1" />
        </div>

        <div
          data-plan="enterprise"
          className="bg-background shadow-foreground/5 flex flex-col items-center justify-start rounded-lg border px-16  py-12 shadow-lg"
        >
          <p className="text-foreground text-4xl font-medium">{scopedT('business')}</p>
          {/* <p className="text-primary mt-2.5 text-xl font-medium dark:invert">
            {locationIpNoLocal === 'GE' && '75₾'}
            {locationIpNoLocal !== 'GE' && currentLocale === 'en' && '$25'}
          </p> */}
          <div className="text-primary mt-2.5 text-xl font-medium">
            {period === 'MONTHLY' && (
              <div className="dark:invert">{currentCountry === 'ka' ? '75₾' : '$25'}</div>
            )}
            {period === 'YEARLY' && (
              <div className="dark:invert">{currentCountry === 'ka' ? '60₾' : '$20'}</div>
            )}
          </div>

          <p className="text-foreground mt-4 max-w-[30ch] text-center">1 {scopedT('singleUser')}</p>

          <Button className="mt-6 rounded-full text-base" asChild>
            <Link
              href={`${NEXT_PUBLIC_WEBAPP_URL()}/signup?utm_source=pricing-early-adopter`}
              target="_blank"
            >
              {scopedT('signup')}
            </Link>
          </Button>

          <div className="mt-8 flex w-full flex-col divide-y">
            {businessCardArr.map((card) => (
              <div
                onClick={() => openBusinessDialogHandler(card.id)}
                key={card.id}
                className="text-foreground flex cursor-pointer items-center justify-between py-4"
              >
                {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                <p>{scopedT(card.title as keyof typeof scopedT)}</p>
                <InfoIcon className="text-primary dark:invert" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
