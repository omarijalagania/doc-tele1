/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import type { Metadata } from 'next';

import { cn } from '@documenso/ui/lib/utils';

import { Hero } from '~/components/(marketing)/hero';

export const revalidate = 600;
export const metadata: Metadata = {
  title: {
    absolute: 'Documenso - The Open Source DocuSign Alternative',
  },
};

export default async function IndexPage() {
  const starCount = await fetch('https://api.github.com/repos/documenso/documenso', {
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
  })
    .then(async (res) => res.json())
    .then((res) => (typeof res.stargazers_count === 'number' ? res.stargazers_count : undefined))
    .catch(() => undefined);

  return (
    <div className={cn('mt-12')}>
      <Hero starCount={starCount} />

      {/* <FasterSmarterBeautifulBento className="my-48" /> */}
      {/* <ShareConnectPaidWidgetBento className="my-48" />
      <OpenBuildTemplateBento className="my-48" /> */}

      {/* <Callout starCount={starCount} /> */}
    </div>
  );
}
