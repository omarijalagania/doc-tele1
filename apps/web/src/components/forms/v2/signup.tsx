'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { AppError, AppErrorCode } from '@documenso/lib/errors/app-error';
import { WidgetRegister } from '@documenso/marketing/src/components/(marketing)/widget-register';
import { TRPCClientError } from '@documenso/trpc/client';
import { trpc } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { Checkbox } from '@documenso/ui/primitives/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { PasswordInput } from '@documenso/ui/primitives/password-input';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { UserProfileSkeleton } from '~/components/ui/user-profile-skeleton';
import { UserProfileTimur } from '~/components/ui/user-profile-timur';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';
import type { SignUpSchema } from '~/schemas/sign-up.schema';
import { signUpSchema } from '~/schemas/sign-up.schema';

import usFlag from '../../../../public/images/en.png';
import geFlag from '../../../../public/images/ka.png';

const SIGN_UP_REDIRECT_PATH = '/documents';

type SignUpStep = 'BASIC_DETAILS' | 'CLAIM_USERNAME';

export type SignUpFormV2Props = {
  className?: string;
  initialEmail?: string;
  isGoogleSSOEnabled?: boolean;
  isOIDCSSOEnabled?: boolean;
};

export const SignUpFormV2 = ({
  className,
  initialEmail,
  isGoogleSSOEnabled,
  isOIDCSSOEnabled,
}: SignUpFormV2Props) => {
  const { toast } = useToast();
  const analytics = useAnalytics();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<SignUpStep>('BASIC_DETAILS');
  const currentLocale = useCurrentLocale();
  const utmSrc = searchParams?.get('utm_source') ?? null;

  const baseUrl = new URL(NEXT_PUBLIC_WEBAPP_URL() ?? 'http://localhost:3000');

  const form = useForm<SignUpSchema>({
    values: {
      name: '',
      email: initialEmail ?? '',
      password: '',
      language: currentLocale,
      repeatPassword: '',
      phone: '',
      url: '',
      isAgreed: false,
    },
    mode: 'onChange',

    resolver: zodResolver(signUpSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const {
    formState: { errors },
  } = form;

  const { register, getValues } = form;

  const name = form.watch('name');
  const url = form.watch('url');

  const { mutateAsync: signup } = trpc.auth.signup.useMutation();

  const scopedT = useScopedI18n('auth');
  const scopedTV = useScopedI18n('validation');

  console.log(errors);

  const onFormSubmit = async ({ name, email, password, phone, url }: SignUpSchema) => {
    try {
      await signup({ name, email, password, phone, url });

      router.push(`/unverified-account`);

      toast({
        title: 'Registration Successful',
        description:
          'You have successfully registered. Please verify your account by clicking on the link you received in the email.',
        duration: 5000,
      });

      analytics.capture('App: User Sign Up', {
        email,
        timestamp: new Date().toISOString(),
        custom_campaign_params: { src: utmSrc },
      });
    } catch (err) {
      const error = AppError.parseError(err);

      if (error.code === AppErrorCode.PROFILE_URL_TAKEN) {
        form.setError('url', {
          type: 'manual',
          message: 'This username has already been taken',
        });
      } else if (error.code === AppErrorCode.PREMIUM_PROFILE_URL) {
        form.setError('url', {
          type: 'manual',
          message: error.message,
        });
      } else if (err instanceof TRPCClientError && err.data?.code === 'BAD_REQUEST') {
        toast({
          title: 'An error occurred',
          description: err.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'An unknown error occurred',
          description:
            'We encountered an unknown error while attempting to sign you up. Please try again later.',
          variant: 'destructive',
        });
      }
    }
  };

  // Handle key press to allow only numeric input
  const handleKeyPress = (event: { charCode: number; preventDefault: () => void }) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  // Handle paste to allow only numeric input
  const handlePaste = (event: {
    clipboardData: { getData: (arg0: string) => string };
    preventDefault: () => void;
  }) => {
    const paste = (event.clipboardData || window.Clipboard).getData('text');
    if (!/^\d*$/.test(paste)) {
      event.preventDefault();
    }
  };

  const formatPhoneNumber = (value: string, lang: string) => {
    if (!value) {
      return '';
    }

    const cleaned = value.replace(/\D/g, ''); // Remove non-numeric characters

    if (lang === 'ka') {
      const match = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,2})(\d{0,2})$/);
      if (match) {
        return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
      }
    } else if (lang === 'en') {
      const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`.trim();
      }
    }

    return value;
  };

  // Handle change to ensure only numeric values are kept
  const handleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    const formattedValue = formatPhoneNumber(value, currentLocale);

    form.setValue('phone', formattedValue, { shouldValidate: true });
  };

  const onNextClick = async () => {
    const valid = await form.trigger([
      'name',
      'email',
      'password',
      'repeatPassword',
      'isAgreed',
      'phone',
    ]);

    if (valid) {
      setStep('CLAIM_USERNAME');
    }
  };

  return (
    <div className={cn('flex justify-center gap-x-12', className)}>
      <WidgetRegister className="relative hidden  flex-1 rounded-xl  xl:flex">
        <div className="absolute -inset-8 -z-[2] backdrop-blur">
          {/* <Image
              src={communityCardsImage}
              fill={true}
              alt="community-cards"
              className="dark:brightness-95 dark:contrast-[70%] dark:invert"
            /> */}
        </div>

        {/* <div className="bg-background/50 absolute -inset-8 -z-[1] backdrop-blur-[2px]" /> */}

        <div className="relative flex h-full w-full flex-col items-center justify-evenly">
          {/* <div className="bg-background rounded-2xl border px-4 py-1 text-sm font-medium">
              User profiles are coming soon!
            </div> */}

          <AnimatePresence>
            {step === 'BASIC_DETAILS' ? (
              <motion.div className="w-full max-w-md" layoutId="user-profile">
                <UserProfileTimur
                  rows={2}
                  className="bg-background border-border rounded-2xl border shadow-md"
                />
              </motion.div>
            ) : (
              <motion.div className="w-full max-w-md" layoutId="user-profile">
                <UserProfileSkeleton
                  user={{ name, url: 'lol' }}
                  rows={2}
                  className="bg-background border-border rounded-2xl border shadow-md"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div />
        </div>
      </WidgetRegister>

      <div className="border-border dark:bg-background bg-muted relative z-10 flex min-h-[min(850px,80vh)] w-full max-w-lg flex-col rounded-xl border p-6">
        {step === 'BASIC_DETAILS' && (
          <div className="h-20">
            <h1 className="text-xl font-semibold md:text-2xl">{scopedT('register')}</h1>

            <p className="text-muted-foreground mt-2 text-xs md:text-sm">{scopedT('join')}</p>
          </div>
        )}

        {step === 'CLAIM_USERNAME' && (
          <div className="h-20">
            <h1 className="text-xl font-semibold md:text-2xl">{scopedT('userName')}</h1>

            <p className="text-muted-foreground mt-2 text-xs md:text-sm">{scopedT('slogan')}</p>
          </div>
        )}

        <hr className="-mx-6 my-4" />

        <Form {...form}>
          <form
            className="flex w-full flex-1 flex-col gap-y-4"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
            {step === 'BASIC_DETAILS' && (
              <fieldset className={cn('flex w-full flex-col gap-y-4')} disabled={isSubmitting}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={scopedT('name')} type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={scopedT('email')} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          maxLength={currentLocale === 'ka' ? 12 : 12}
                          minLength={currentLocale === 'ka' ? 12 : 12}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          onPaste={handlePaste}
                          placeholder={scopedT('fillPhone')}
                          //@ts-expect-error - This is a valid prop
                          prefix={
                            <>
                              {currentLocale === 'ka' ? (
                                <div className="flex items-center space-x-2">
                                  <Image width={20} height={16} src={geFlag} alt="ka" />
                                  <p className="font-mtavruliMedium text-sm">+995</p>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Image width={20} height={16} src={usFlag} alt="ka" />
                                  <p className="font-mtavruliMedium text-sm">+1</p>
                                </div>
                              )}
                            </>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput placeholder={scopedT('password')} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput placeholder={scopedT('repeatPassword')} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-1">
                  <FormField
                    control={form.control}
                    name="isAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            className={`${
                              errors.isAgreed?.message ? 'border-red-300' : ''
                            } mb-2 h-4 w-4`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="text-sm text-gray-500">
                    {scopedT('agree')}{' '}
                    <Link
                      href={`http://localhost:3001/${currentLocale}/terms`}
                      className="hover:text-green-primary inline-block cursor-pointer font-semibold text-gray-700 transition-colors"
                    >
                      {scopedT('privacy')}
                    </Link>{' '}
                    <span>{scopedT('and')} </span>
                    <Link
                      href={`http://localhost:3001/${currentLocale}/privacy`}
                      className="hover:text-green-primary inline-block cursor-pointer font-semibold text-gray-700 transition-colors"
                    >
                      {' '}
                      {scopedT('politics')}
                    </Link>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 text-sm">
                  {scopedT('haveAccount')}{' '}
                  <Link
                    href="/signin"
                    className="text-primary duration-200 hover:opacity-70 dark:text-[#ffeb81]"
                  >
                    {scopedT('login')}
                  </Link>
                </p>
              </fieldset>
            )}

            {step === 'CLAIM_USERNAME' && (
              <fieldset
                className={cn(
                  'flex h-[550px] w-full flex-col gap-y-4',
                  isGoogleSSOEnabled && 'h-[650px]',
                )}
                disabled={isSubmitting}
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="username"
                          className="mb-2 mt-2 lowercase"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />

                      <div className="bg-muted/50 border-border text-muted-foreground mt-2 inline-block max-w-[16rem] truncate rounded-md border px-2 py-1 text-sm lowercase">
                        {baseUrl.host}/u/{field.value || '<username>'}
                      </div>
                    </FormItem>
                  )}
                />
              </fieldset>
            )}

            <div className="mt-6">
              {step === 'BASIC_DETAILS' && (
                <p className="text-muted-foreground text-sm">
                  <span className="font-medium">{scopedT('step')}</span> 1/2
                </p>
              )}

              {step === 'CLAIM_USERNAME' && (
                <p className="text-muted-foreground text-sm">
                  <span className="font-medium">Claim username</span> 2/2
                </p>
              )}

              <div className="bg-foreground/40 relative mt-4 h-1.5 rounded-full">
                <motion.div
                  layout="size"
                  layoutId="document-flow-container-step"
                  className="bg-primary absolute inset-y-0 left-0 rounded-full dark:bg-[#ffeb81]"
                  style={{
                    width: step === 'BASIC_DETAILS' ? '50%' : '100%',
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              {/* Go back button, disabled if step is basic details */}
              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="flex-1"
                disabled={step === 'BASIC_DETAILS' || form.formState.isSubmitting}
                onClick={() => setStep('BASIC_DETAILS')}
              >
                {scopedT('back')}
              </Button>

              {/* Continue button */}
              {step === 'BASIC_DETAILS' && (
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 disabled:cursor-not-allowed"
                  loading={form.formState.isSubmitting}
                  onClick={onNextClick}
                >
                  {scopedT('continue')}
                </Button>
              )}

              {/* Sign up button */}
              {step === 'CLAIM_USERNAME' && (
                <Button
                  loading={form.formState.isSubmitting}
                  disabled={!form.formState.isValid}
                  type="submit"
                  size="lg"
                  className="flex-1"
                >
                  {scopedT('finish')}
                </Button>
              )}
            </div>
          </form>
          {/* <Footer /> */}
        </Form>
      </div>
    </div>
  );
};
