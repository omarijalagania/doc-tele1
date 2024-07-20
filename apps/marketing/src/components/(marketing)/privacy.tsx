/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { useScopedI18n } from '~/locales/client';

import { WidgetNoForm } from './widget-no-form';

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

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

function PrivacyContainer() {
  const scopedT = useScopedI18n('privacyPage');

  return (
    <>
      <motion.h2
        style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
        variants={HeroTitleVariants}
        initial="initial"
        animate="animate"
        className="text-center text-4xl leading-tight tracking-tight md:text-[40px] lg:text-[44px]"
      >
        {scopedT('privacyTitle')}
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

export default PrivacyContainer;
