'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { usePlausible } from 'next-plausible';
import { env } from 'next-runtime-env';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa6';
import { z } from 'zod';

import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { Card, CardContent } from '@documenso/ui/primitives/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
import { SignaturePad } from '@documenso/ui/primitives/signature-pad';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { claimPlan } from '~/api/claim-plan/fetcher';
import useFetchLocation from '~/hooks/useFetchLocation';
import { useCurrentLocale, useScopedI18n } from '~/locales/client';

const ZWidgetFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    name: z.string().trim().min(3, { message: 'Please enter a valid name.' }),
  })
  .and(
    z.union([
      z.object({
        signatureDataUrl: z.string().min(1),
        signatureText: z.null().or(z.string().max(0)),
      }),
      z.object({
        signatureDataUrl: z.null().or(z.string().max(0)),
        signatureText: z.string().trim().min(1),
      }),
    ]),
  );

export type TWidgetFormSchema = z.infer<typeof ZWidgetFormSchema>;

export type WidgetProps = HTMLAttributes<HTMLDivElement>;

export const WidgetContact = ({ className, children, ...props }: WidgetProps) => {
  const { toast } = useToast();
  const event = usePlausible();
  const { theme } = useTheme();
  const [showSigningDialog, setShowSigningDialog] = useState(false);
  const [draftSignatureDataUrl, setDraftSignatureDataUrl] = useState<string | null>(null);
  const scopedT = useScopedI18n('contactPage');

  let currentCountryCode = 'en';

  if (typeof window !== 'undefined') {
    currentCountryCode = localStorage.getItem('countryCode') ?? 'en';
  }

  const geoAddressMap =
    'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=4/15%20Lane%201,%20Z.%20Gamsakhurdia%20Ave,%20Kutaisi,%20Georgia,%204600+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed';
  const usAddressMap =
    'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1414%20E%2012th%20St,%20Brooklyn,%20NY%2011230+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed';

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TWidgetFormSchema>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      signatureDataUrl: null,
      signatureText: '',
    },
    resolver: zodResolver(ZWidgetFormSchema),
  });

  const signatureDataUrl = watch('signatureDataUrl');
  const signatureText = watch('signatureText');
  const { locationIp } = useFetchLocation();
  const onSignatureConfirmClick = () => {
    setValue('signatureDataUrl', draftSignatureDataUrl);
    setValue('signatureText', '');

    void trigger('signatureDataUrl');
    setShowSigningDialog(false);
  };

  const currentLocale = useCurrentLocale();
  const HeroTitleVariants: Variants = {
    initial: {
      opacity: 0,
      y: 60,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const onFormSubmit = async ({
    email,
    name,
    signatureDataUrl,
    signatureText,
  }: TWidgetFormSchema) => {
    try {
      const delay = new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });

      const planId = env('NEXT_PUBLIC_STRIPE_COMMUNITY_PLAN_MONTHLY_PRICE_ID');

      if (!planId) {
        throw new Error('No plan ID found.');
      }

      const claimPlanInput = signatureDataUrl
        ? {
            name,
            email,
            planId,
            signatureDataUrl: signatureDataUrl,
            signatureText: null,
          }
        : {
            name,
            email,
            planId,
            signatureDataUrl: null,
            signatureText: signatureText ?? '',
          };

      const [result] = await Promise.all([claimPlan(claimPlanInput), delay]);

      event('claim-plan-widget');

      window.location.href = result;
    } catch (error) {
      event('claim-plan-failed');

      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <motion.h2
        style={{ fontFamily: 'var(--font-mtavruli-bold)' }}
        variants={HeroTitleVariants}
        initial="initial"
        animate="animate"
        className="text-center text-4xl leading-tight tracking-tight md:text-[40px] lg:text-[44px]"
      >
        {scopedT('contactUs')}
        <p
          style={{ fontFamily: 'var(--font-mtavruli-medium)' }}
          className="!text-foreground mt-4 !text-lg !leading-normal"
        >
          {scopedT('contactUsDescription')}
        </p>
      </motion.h2>
      <motion.div
        className="mt-12"
        variants={{
          initial: {
            scale: 0.2,
            opacity: 0,
          },
          animate: {
            scale: 1,
            opacity: 1,
            transition: {
              ease: 'easeInOut',
              delay: 0.2,
              duration: 0.8,
            },
          },
        }}
        initial="initial"
        animate="animate"
      >
        <Card
          className={cn('mx-auto mb-5 w-full  rounded-3xl before:rounded-3xl', className)}
          gradient
          {...props}
        >
          <CardContent className="py-4">
            <div className="flex flex-col items-start justify-around space-y-4 pl-4 md:flex-row md:items-center md:space-y-0 md:pl-0">
              <div className="flex flex-shrink-0 items-center space-x-3">
                <div className="bg-primary flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-full dark:bg-[#ffeb81]">
                  <PhoneIcon
                    fill={theme === 'dark' ? 'hsl(230.5, 100%, 24.7%)' : 'white'}
                    color={theme === 'dark' ? 'hsl(230.5, 100%, 24.7%)' : 'white'}
                    size={21}
                  />
                </div>
                <span>
                  <h3 className="text-base font-semibold">{scopedT('phone')}</h3>
                  <p className="text-muted-foreground text-[15px]">
                    {currentCountryCode === 'ka' ? '+995 (32) 3100100' : '+1 (718) 414 2010'}
                  </p>
                </span>
              </div>
              <div className="flex flex-shrink-0 items-center space-x-3">
                <div className="bg-primary flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-full dark:bg-[#ffeb81]">
                  <FaEnvelope
                    color={theme === 'dark' ? 'hsl(230.5, 100%, 24.7%)' : 'white'}
                    size={21}
                  />
                </div>
                <span>
                  <h3 className="text-base font-semibold">{scopedT('email')}</h3>
                  <p className="text-muted-foreground text-[15px]">info@esignix.com</p>
                </span>
              </div>
              <div className="flex flex-shrink-0 items-center space-x-3">
                <div className="bg-primary flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-full dark:bg-[#ffeb81]">
                  <MapPinIcon
                    fill={theme === 'dark' ? 'hsl(230.5, 100%, 24.7%)' : 'white'}
                    color={theme === 'dark' ? 'hsl(230.5, 100%, 24.7%)' : 'white'}
                    size={21}
                  />
                </div>
                <span>
                  <h3 className="text-base font-semibold">{scopedT('address')}</h3>
                  <p className="text-muted-foreground text-[15px]">
                    {currentCountryCode === 'ka'
                      ? currentLocale === 'ka'
                        ? 'საქართველო, 4600, ქუთაისი, ზ. გამსახურდიას გამზ. 1 შეს 4/15'
                        : '4/15 Lane 1, Z. Gamsakhurdia Ave, Kutaisi, 4600, Georgia'
                      : '1414 E 12th St, Brooklyn, NY 11230'}
                  </p>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn('mx-auto  rounded-3xl before:rounded-3xl', className)}
          gradient
          degrees={320}
          {...props}
        >
          <div className="flex flex-1 flex-col items-center gap-y-8 overflow-hidden p-2 md:flex-row">
            <div className="text-muted-foreground flex flex-col gap-y-4 p-4 text-xs leading-relaxed md:w-1/2 ">
              {children}
            </div>

            <div className="bg-foreground/5 rounded-2xl p-4 md:w-1/2 ">
              <div>
                {
                  <iframe
                    width="100%"
                    height={500}
                    frameBorder={0}
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={currentCountryCode === 'ka' ? geoAddressMap : usAddressMap}
                  ></iframe>
                }
              </div>
            </div>
          </div>
        </Card>

        <Dialog open={showSigningDialog} onOpenChange={setShowSigningDialog}>
          <DialogContent position="center">
            <DialogHeader>
              <DialogTitle>Add your signature</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              By signing you signal your support of Documenso's mission in a <br></br>
              <strong>non-legally binding, but heartfelt way</strong>. <br></br>
              <br></br>You also unlock the option to purchase the early supporter plan including
              everything we build this year for fixed price.
            </DialogDescription>

            <SignaturePad
              disabled={isSubmitting}
              className="aspect-video w-full rounded-md border"
              defaultValue={signatureDataUrl || ''}
              onChange={setDraftSignatureDataUrl}
            />

            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowSigningDialog(false)}>
                Cancel
              </Button>

              <Button onClick={() => onSignatureConfirmClick()}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
};
