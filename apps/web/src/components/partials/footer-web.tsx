'use client';

import { type HTMLAttributes } from 'react';

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

import LanguageSwitch from './language-switch';

/* eslint-disable @typescript-eslint/consistent-type-assertions */

// import { StatusWidgetContainer } from './status-widget-container';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

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

export const FooterWeb = ({ className, ...props }: FooterProps) => {
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
    <div className={cn('absolute bottom-1 w-full sm:bottom-5', className)} {...props}>
      <div className="mx-auto mt-4 flex w-full flex-col-reverse flex-wrap items-center justify-between gap-4 px-2 sm:flex-row md:max-w-screen-2xl md:px-16">
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

          <LanguageSwitch />

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
