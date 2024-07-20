import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';

import { useChangeLocale, useCurrentLocale } from '~/locales/client';

import useFetchLocation from '../../../../marketing/src/hooks/useFetchLocation';

function LanguageSwitch() {
  useFetchLocation();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const [currentCountryCode, setCurrentCountryCode] = useState('en');

  useFetchLocation();

  let options = [
    {
      id: 1,
      value: 'en',
      label: 'English - EN',
    },
    {
      id: 2,
      value: 'ka',
      label: 'ქართული - KA',
    },
  ];

  const lang = localStorage.getItem('countryCode');

  if (lang !== 'ka') {
    options = options.filter((option) => option.value !== 'ka');
  }

  const changeLanguage = (locale: string) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    changeLocale(locale as 'ka' | 'en');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xs outline-none ring-0">
        {options.find((item) => item.value === currentLocale)?.label.includes('EN') ? 'EN' : 'KA'}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        {options.map((option) => (
          <DropdownMenuItem
            className="py-0 text-xs"
            key={option.id}
            onClick={() => changeLanguage(option.value)}
          >
            <DropdownMenuCheckboxItem
              className="text-xs"
              checked={currentLocale === option.value}
              //onCheckedChange={setShowStatusBar}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitch;
