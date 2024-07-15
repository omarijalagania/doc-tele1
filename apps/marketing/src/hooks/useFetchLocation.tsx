'use client';

import { useEffect, useState } from 'react';

import { useFeatureFlags } from '@documenso/lib/client-only/providers/feature-flag';

import { useChangeLocale } from '~/locales/client';

function useFetchLocation() {
  const [locationIp, setLocationIp] = useState<string>('');
  const [lang, setLang] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const { setCurrentCountry } = useFeatureFlags();
  const changeLocale = useChangeLocale();

  useEffect(() => {
    const locationCheck = localStorage.getItem('locationCheck');

    async function getLocation() {
      if (locationCheck === 'true') {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        localStorage.setItem('locationCheck', 'true');
        const countryCode = data.CountryCode;
        setLocationIp(countryCode);
        setLoading(false);
        const lang2 = data.CountryCode === 'GE' ? 'ka' : 'en';
        setLang(lang2);
        localStorage.setItem('countryCode', lang2);
        changeLocale(lang2);
        setCurrentCountry(lang2);
        localStorage.setItem('step-1', JSON.stringify({ language: lang }));
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    void getLocation();
  }, [changeLocale, lang]);

  return {
    locationIp,
    loading,
    lang,
    setLang,
  };
}

export default useFetchLocation;
