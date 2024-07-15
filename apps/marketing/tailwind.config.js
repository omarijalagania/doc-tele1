/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@documenso/tailwind-config');
const path = require('path');

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    `${path.join(require.resolve('@documenso/ui'), '..')}/**/*.{ts,tsx}`,
  ],

  fontFamily: {
    mtavtuliMedium: ['var(--font-mtavruli-medium)'],
    mtavruliBold: ['var(--font-mtavruli-bold)'],
  },
};
