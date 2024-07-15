'use client';

import { useEffect, useState } from 'react';

function useFetchIp() {
  const [locationIpNoLocal, setLocationIpNoLocal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //const locationCheck = localStorage.getItem('locationCheck');

    async function getLocation() {
      // if (locationCheck === 'true') {
      //   return;
      // }

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        // localStorage.setItem('locationCheck', 'true');
        const countryCode = data.CountryCode;
        setLocationIpNoLocal(countryCode);
        setLoading(false);
        //const lang = countryCode === 'GE' ? 'ka' : 'en';
        // localStorage.setItem('step-1', JSON.stringify({ language: lang }));
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    void getLocation();
  }, []);

  return {
    locationIpNoLocal,
    loading,
  };
}

export default useFetchIp;
