import type { Metadata } from 'next';

import MiniIcon from '../public/img/orient-logo-mini.png';
import logoIconImg from '../public/img/orient-logo.png';
import logoImg from '../public/logo.svg';
import { LAYOUT_OPTIONS } from './enums';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Isomorphic - React Typescript Admin Dashboard Template',
  description: `Isomorphic the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
  logo: logoImg,
  icon: logoIconImg,
  miniIcon: MiniIcon,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: Partial<Metadata['openGraph']>,
  description: string = siteConfig.description,
): Metadata => {
  return {
    title: title ? `${title} - Isomorphic Furyroad` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Isomorphic Furyroad` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Isomorphic Furyroad', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
