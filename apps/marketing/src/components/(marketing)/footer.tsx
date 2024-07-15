/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { type HTMLAttributes } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Facebook, YoutubeIcon } from 'lucide-react';
import LogoImage from 'public/images/oo-logo-32.png';
import { FaXTwitter } from 'react-icons/fa6';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';
import { cn } from '@documenso/ui/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { ThemeSwitcher } from '@documenso/ui/primitives/theme-switcher';

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '~/locales/client';

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

/* eslint-disable @typescript-eslint/consistent-type-assertions */

// import { StatusWidgetContainer } from './status-widget-container';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/documenso', icon: <FaXTwitter className="h-6 w-6" /> },
  { href: 'https://github.com/documenso/documenso', icon: <Facebook className="h-6 w-6" /> },
  { href: 'https://www.youtube.com/@e-Signix', icon: <YoutubeIcon className="h-7 w-7" /> },
];

const FOOTER_LINKS = [
  { href: '/terms', text: 'terms' },

  { href: '/security', text: 'security' },
  { href: '/privacy', text: 'privacy' },
  { href: '/about', text: 'about' },

  { href: '/law', text: 'law' },
  { href: '/contact', text: 'contactUs' },
  { href: '/cookie', text: 'cookie' },

  //  { href: '/pricing', text: 'pricing' },
];

const COUNTRIES = [
  {
    id: '1',
    value: 'ka',
    label: 'ka',
  },
  {
    id: '2',
    value: 'en',
    label: 'en',
  },
];

export const Footer = ({ className, ...props }: FooterProps) => {
  const scopedT = useScopedI18n('footer');
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const { setCurrentCountry } = useFeatureFlags();

  const countryHandler = (value: string) => {
    //setLang(value);
    changeLocale(value as 'ka' | 'en');
    localStorage.setItem('countryCode', value);
    setCurrentCountry(value);
  };

  const lang = localStorage.getItem('countryCode') as string;

  return (
    <div className={cn('border-t py-12', className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-start justify-between gap-8 px-8">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={LogoImage}
              alt="Documenso Logo"
              className="dark:invert"
              width={170}
              height={0}
            />
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-4">
            {SOCIAL_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                className="text-muted-foreground hover:text-muted-foreground/80"
              >
                {link.icon}
              </Link>
            ))}
          </div>

          {/* <div className="mt-6">
            <StatusWidgetContainer />
          </div> */}
        </div>

        <div className="grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-2 md:w-auto md:gap-x-8">
          {FOOTER_LINKS.map((link, index) => (
            <Link
              onClick={() => window.scrollTo(0, 0)}
              scroll={true}
              key={index}
              href={`/${currentLocale}${link.href}`}
              className="text-muted-foreground hover:text-muted-foreground/80 flex-shrink-0 break-words text-sm"
            >
              {scopedT(
                link.text as
                  | 'ka'
                  | 'en'
                  | 'terms'
                  | 'security'
                  | 'privacy'
                  | 'about'
                  | 'law'
                  | 'contactUs'
                  | 'cookie'
                  | 'pricing',
              ) ?? ''}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-4 px-8 md:mt-12 lg:mt-24">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Telecom 1 LLC. All rights reserved.
        </p>

        <div className="flex flex-wrap space-x-8">
          <Select
            defaultValue={lang && (lang as string)}
            onValueChange={(value) => countryHandler(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="outline-none ring-0 focus:outline-none focus:ring-0"
                placeholder={scopedT(
                  COUNTRIES.find((country) => country.value === lang)
                    ?.label as keyof typeof scopedT,
                )}
              />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectGroup key={country.id}>
                  <SelectItem className="dark:hover:text-[#FFEB81]" value={country.value}>
                    {scopedT(country.label as keyof typeof scopedT)}
                  </SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
