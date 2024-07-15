/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { useScopedI18n } from '~/locales/client';

import { WidgetNoForm } from './widget-no-form';

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

/* eslint-disable @typescript-eslint/consistent-type-assertions */

// ინტერნეტი - GPON და Peer-to-Peer (P2P)
// ვირტუალური ასს (PBX)
// VoIP ტელეფონი (Voice over IP)
// A2P SMS (application-to-person)
// კოლოკაცია (Colocatiin Center)
// ინტერნეტის ურთიერთგაცვლის წერტილი (IXP)
// კორპორატიული შიდა ქსელის დაგეგმვა
// ფილიალებს შორის კავშირის მოწყობა
// ქსელის უსაფრთხოება
// საქალაქთაშორისო ოპტიკურ-ბოჭკოვანი მაგისტრალების მშენებლობა და მათი ტექნიკური მხარდაჭერა.

const uListArray = [
  {
    id: 1,
    value: 'p2p',
  },
  {
    id: 2,
    value: 'pbx',
  },
  {
    id: 3,
    value: 'voip',
  },
  {
    id: 4,
    value: 'a2p',
  },
  {
    id: 5,
    value: 'colocation',
  },
  {
    id: 6,
    value: 'ixp',
  },
  {
    id: 7,
    value: 'corporateNetwork',
  },
  {
    id: 8,
    value: 'branchConnection',
  },
  {
    id: 9,
    value: 'networkSecurity',
  },
  {
    id: 10,
    value: 'opticalFiber',
  },
];

const HeroTitleVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function LawContainer() {
  const scopedT = useScopedI18n('lawPage');

  return (
    <>
      <motion.h2
        style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
        variants={HeroTitleVariants}
        initial="initial"
        animate="animate"
        className="text-center text-4xl leading-tight tracking-tight md:text-[40px] lg:text-[44px]"
      >
        {scopedT('lawTitle')}
      </motion.h2>
      <motion.div
        className="mt-12"
        variants={{
          initial: {
            scale: 0.2,
            opacity: 0,
          },
          animate: {
            scale: 1,
            opacity: 1,
            transition: {
              ease: 'easeInOut',
              delay: 0.2,
              duration: 0.8,
            },
          },
        }}
        initial="initial"
        animate="animate"
      >
        <WidgetNoForm className="mt-12">
          {/* <strong>{scopedTDescription('elSign')}</strong> */}

          <div className="text-base" dangerouslySetInnerHTML={{ __html: scopedT('desc1') }} />
        </WidgetNoForm>
      </motion.div>
    </>
  );
}

export default LawContainer;
