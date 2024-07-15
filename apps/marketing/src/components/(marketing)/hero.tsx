'use client';

import Link from 'next/link';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';
import { match } from 'ts-pattern';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';
import { Card, CardContent } from '@documenso/ui/primitives/card';

import { useScopedI18n } from '~/locales/client';

import { Widget } from './widget';

export type HeroProps = {
  className?: string;
  [key: string]: unknown;
};

const BackgroundPatternVariants: Variants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,

    transition: {
      delay: 1,
      duration: 1.2,
    },
  },
};

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

export const Hero = ({ className, ...props }: HeroProps) => {
  const event = usePlausible();

  const scopedT = useScopedI18n('cards');
  const scopedTDescription = useScopedI18n('description');

  const { getFlag } = useFeatureFlags();

  const heroMarketingCTA = getFlag('marketing_landing_hero_cta');

  const onSignUpClick = () => {
    const el = document.getElementById('email');

    if (el) {
      const { top } = el.getBoundingClientRect();

      window.scrollTo({
        top: top - 120,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => {
        el.focus();
      });
    }
  };

  return (
    <motion.div className={cn('relative', className)} {...props}>
      <div className="relative">
        <motion.h2
          style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
          variants={HeroTitleVariants}
          initial="initial"
          animate="animate"
          className="text-center text-4xl leading-tight tracking-tight md:text-[40px] lg:text-[44px]"
        >
          {scopedTDescription('elSign')}
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
                delay: 0.5,
                duration: 0.8,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <Widget className="mt-12">
            {/* <strong>{scopedTDescription('elSign')}</strong> */}
            <p className="w-full max-w-[70ch] text-base">{scopedTDescription('desc1')}</p>
            <p className="w-full max-w-[70ch] text-base">{scopedTDescription('desc2')}</p>

            <div className="flex h-24 items-center">
              <p
                style={{
                  fontFamily: 'var(--font-mtavruli-bold)',
                }}
                className={cn('text-5xl')}
              >
                {scopedTDescription('signSlogan')}
              </p>
            </div>

            <div>
              <strong>{scopedTDescription('coFounder')}</strong>
              {/* <p className="mt-1">Co-Founders, Documenso</p> */}
            </div>
          </Widget>
        </motion.div>

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
                delay: 0.5,
                duration: 0.8,
              },
            },
          }}
          initial="initial"
          animate="animate"
        >
          <div className="mt-6 grid grid-cols-2 gap-8 md:mt-8">
            <Card gradient className="col-span-2 lg:col-span-1" spotlight>
              <CardContent className="grid grid-cols-1 gap-8 p-6">
                <p className="text-muted-foreground text-base leading-relaxed ">
                  <strong
                    style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
                    className="block text-[44px]"
                  >
                    {scopedT('create')}
                  </strong>
                  {scopedT('createSendDescription')}
                </p>

                <div className="flex items-center justify-center p-8 opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-folder-plus dark:invert"
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="#00147E"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5"></path>
                    <path d="M16 19h6" className="text-green-400"></path>
                    <path d="M19 16v6" className="text-green-400"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2 lg:col-span-1" spotlight>
              <CardContent className="grid grid-cols-1 gap-8 p-6">
                <p className="text-muted-foreground text-base leading-relaxed">
                  <strong
                    style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
                    className="block text-[44px]"
                  >
                    {scopedT('send')}
                  </strong>
                  {scopedT('createSendDescription')}
                </p>

                <div className="flex items-center justify-center p-8 opacity-40">
                  {/* <Image
                  src={cardBeautifulFigure}
                  alt="its fast"
                  className="w-full max-w-xs dark:contrast-[70%] dark:hue-rotate-180 dark:invert"
                /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-certificate dark:invert"
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="#00147E"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
                      className="text-success"
                    ></path>
                    <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" className="text-success"></path>
                    <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path>
                    <path d="M6 9l12 0"></path>
                    <path d="M6 12l3 0"></path>
                    <path d="M6 15l2 0"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid  grid-cols-2 gap-8 md:mt-8">
            <Card className="col-span-2 lg:col-span-1" spotlight>
              <CardContent className="grid grid-cols-1 gap-8 p-6">
                <p className="text-muted-foreground text-base leading-relaxed">
                  <strong
                    style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
                    className="block text-[44px]"
                  >
                    {scopedT('sign')}
                  </strong>
                  {scopedT('createSignDescription')}
                </p>

                <div className="flex items-center justify-center p-8 opacity-40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail-forward dark:invert"
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="#00147E"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path>
                    <path d="M3 6l9 6l9 -6"></path>
                    <path d="M15 18h6" className="text-success"></path>
                    <path d="M18 15l3 3l-3 3" className="text-success"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2 lg:col-span-1" gradient degrees={300} spotlight>
              <CardContent className="grid grid-cols-1 gap-8 p-6">
                <p className="text-muted-foreground text-base leading-relaxed">
                  <strong
                    style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
                    className="block text-[44px]"
                  >
                    {scopedT('done')}
                  </strong>
                  {scopedT('createDescription')}
                </p>

                <div className="flex items-center justify-center p-8 opacity-40">
                  {/* <Image
                  src={cardBeautifulFigure}
                  alt="its fast"
                  className="w-full max-w-xs dark:contrast-[70%] dark:hue-rotate-180 dark:invert"
                /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-circle-check dark:invert"
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="#00147E"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M9 12l2 2l4 -4" className="text-success"></path>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {match(heroMarketingCTA)
          .with('spm', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="border-primary bg-background hover:bg-muted mx-auto mt-8 w-60 rounded-xl border transition-colors duration-300"
            >
              <Link href="/singleplayer" className="block px-4 py-2 text-center">
                <h2 className="text-muted-foreground text-xs font-semibold">
                  Introducing Single Player Mode
                </h2>

                <h1 className="text-foreground mt-1.5 font-medium leading-5">
                  Self sign for free!
                </h1>
              </Link>
            </motion.div>
          ))
          .with('productHunt', () => (
            <motion.div
              variants={HeroTitleVariants}
              initial="initial"
              animate="animate"
              className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-4"
            >
              <Link
                href="https://www.producthunt.com/posts/documenso?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-documenso"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=395047&theme=light&period=daily"
                  alt="Documenso - The open source DocuSign alternative | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                />
              </Link>
            </motion.div>
          ))
          .otherwise(() => null)}
      </div>
    </motion.div>
  );
};
