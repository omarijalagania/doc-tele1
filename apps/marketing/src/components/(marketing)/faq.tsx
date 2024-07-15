/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@documenso/ui/primitives/accordion';
import { Button } from '@documenso/ui/primitives/button';

import { PricingTable } from '~/components/(marketing)/pricing-table';
import { useScopedI18n } from '~/locales/client';

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

const faqs = [
  {
    id: 1,
    question: 'question1',
    answer: 'answer1',
  },
  {
    id: 2,
    question: 'question2',
    answer: 'answer2',
  },
  {
    id: 3,
    question: 'question3',
    answer: 'answer3',
  },
  {
    id: 4,
    question: 'question4',
    answer: 'answer4',
  },
  {
    id: 5,
    question: 'question5',
    answer: 'answer5',
  },
  {
    id: 6,
    question: 'question6',
    answer: 'answer6',
  },
  {
    id: 7,
    question: 'question7',
    answer: 'answer7',
  },
  {
    id: 8,
    question: 'question8',
    answer: 'answer8',
  },
  {
    id: 9,
    question: 'question9',
    answer: 'answer9',
  },
];

export const dynamic = 'force-dynamic';

export type PricingPageProps = {
  searchParams?: {
    planId?: string;
    email?: string;
    name?: string;
    cancelled?: string;
  };
};

export default function FaqContainer() {
  const scopeT = useScopedI18n('faq');

  return (
    <div className="mt-6 sm:mt-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold lg:text-5xl">{scopeT('price')}</h1>

        <p className="text-foreground mt-4 text-lg leading-normal">{scopeT('startUsing')}</p>
        {/* <p className="text-foreground text-lg leading-normal">Get started today.</p> */}
      </div>

      <div className="mt-6">
        <PricingTable />
      </div>

      <div className="mx-auto mt-36 max-w-3xl">
        <h2 className="text-center text-2xl font-semibold">{scopeT('headerQuestion')}</h2>

        <p className="text-muted-foreground mt-4 text-center leading-relaxed">
          {scopeT('headerAnswer')}
        </p>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full hover:cursor-pointer" asChild>
            <Link href="https://github.com/documenso/documenso" target="_blank" rel="noreferrer">
              {scopeT('contactUs')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-36 max-w-5xl">
        {/* FAQ Section */}

        <h2 className="text-4xl font-semibold">{scopeT('title')}</h2>

        <Accordion type="multiple" className="mt-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.question}>
              <AccordionTrigger className="text-lg font-semibold">
                {scopeT(
                  faq.question as
                    | 'question1'
                    | 'question2'
                    | 'question3'
                    | 'question4'
                    | 'question5'
                    | 'question6'
                    | 'question7'
                    | 'question8'
                    | 'question9',
                )}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground max-w-4xl text-sm leading-relaxed">
                {scopeT(
                  faq.answer as
                    | 'answer1'
                    | 'answer2'
                    | 'answer3'
                    | 'answer4'
                    | 'answer5'
                    | 'answer6'
                    | 'answer7'
                    | 'answer8'
                    | 'answer9',
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
