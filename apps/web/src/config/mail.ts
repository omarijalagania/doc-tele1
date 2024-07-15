// import { env } from '@/env.mjs';

export const MAIL = {
  service: 'gmail',
  name: 'smtp.google.com',
  host: 'smtp.google.com',
  port: parseInt('586'),
  secure: true,
  // host: 'smtp.google.com',
  // port: 465,
  // secure: true,
  auth: {
    user: 'user',
    pass: 'password',
  },
  from: 'admin@location.dev',
  logger: true,
  debug: true,
};
