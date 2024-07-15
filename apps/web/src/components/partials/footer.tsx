/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { type HTMLAttributes, useEffect } from 'react';

import { Facebook, YoutubeIcon } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

import { cn } from '@documenso/ui/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { ThemeSwitcher } from '@documenso/ui/primitives/theme-switcher';

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '~/locales/client';

import useFetchLocation from '../../../../marketing/src/hooks/useFetchLocation';
import LanguageSwitch from './language-switch';

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
  const { locationIp } = useFetchLocation();

  useEffect(() => {
    if (locationIp === 'GE') {
      changeLocale('ka');
    }
  }, [changeLocale, locationIp]);

  return (
    <div className={cn('w-full ', className)} {...props}>
      <div className="absolute bottom-6 flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-4 px-8 ">
        {/* <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Telecom 1 LLC. All rights reserved.
        </p> */}

        <div className="flex flex-wrap space-x-8">
          <Select onValueChange={(value) => changeLocale(value as 'ka' | 'en')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="outline-none ring-0 focus:outline-none focus:ring-0"
                placeholder={scopedT(
                  COUNTRIES.find((country) => country.value === currentLocale)
                    ?.label as keyof typeof scopedT,
                )}
              />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem
                  className="dark:hover:text-[#FFEB81]"
                  key={country.id}
                  value={country.value}
                >
                  {scopedT(country.label as keyof typeof scopedT)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <LanguageSwitch />
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
};
