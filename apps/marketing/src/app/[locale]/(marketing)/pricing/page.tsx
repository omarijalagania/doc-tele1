import type { Metadata } from 'next';

import FaqContainer from '~/components/(marketing)/faq';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default function PricingPage() {
  return (
    <>
      <FaqContainer />
    </>
  );
}
