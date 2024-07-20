import { z } from 'zod';

import { messages } from '../config/messages';

// form zod validation schema
export const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: 'required' })
      .email({ message: messages.invalidEmail }),
    name: z.string().trim().min(1, {
      message: messages.fullNameIsRequired,
    }),
    language: z.string().trim().min(2),
    url: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { message: 'required' })
      .regex(/^[a-z0-9-]+$/, {
        message: 'Username can only container alphanumeric characters and dashes.',
      }),
    phone: z.string(),
    // isAgreed: z
    //   .boolean()
    //   .refine((value) => value === true, 'You must agree to the terms and conditions'),
    // phone: z.string().min(5, {
    //   message: 'phone',
    // }),

    password: z.string().trim().min(6, messages.passwordLengthMin),
    repeatPassword: z.string().min(6, messages.passwordLengthMin),

    //industry: z.string().trim().min(1, messages.industryIsRequired),

    isAgreed: z.boolean().refine((value) => value === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine(
    (values) => {
      if (values.language === 'ka') {
        return values.phone.length >= 12 && values.phone.length <= 12;
      } else if (values.language === 'en') {
        return values.phone.length >= 12 && values.phone.length <= 12;
      }
      return true;
    },
    {
      message: messages.phoneNumberIsRequired,

      path: ['phone'],
    },
  )
  .refine((values) => values.password === values.repeatPassword, {
    message: 'passwordMatch',
    path: ['repeatPassword'],
  });

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
